using DrivingApp.Common.Enum;
using DrivingApp.Interface.Services;
using DrivingApp.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DrivingApp.Services
{
	public class TokenService : ITokenService
	{
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
            };

            var roles = Enum.GetValues(typeof(Role));
            //claims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));
            /*            foreach (Role role in roles)
                        {
                            claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, role.ToString()));
                        };*/
            claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString()));

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                //Audience = "http://localhost:3000",
                Issuer = "https://localhost:44354",
                Claims = new Dictionary<string, object>
                {
                    { JwtRegisteredClaimNames.Aud, new string [] { "http://localhost:3000", "http://192.168.0.30:8081"} }
                }
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string CreateTokenUser(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var roles = Enum.GetValues(typeof(Role));
            claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString()));

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
