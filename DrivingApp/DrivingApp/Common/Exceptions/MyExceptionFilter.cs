using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DrivingApp.Common.Exceptions
{
	public class MyExceptionFilter : IExceptionFilter
	{
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is MyException)
            {
                var result = new ObjectResult(context.Exception.Message)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
                context.Result = result;
            }
        }
    }
}
