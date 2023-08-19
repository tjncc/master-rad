namespace DrivingApp.Common.Struct
{
    public struct Coords
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public Coords(double lat, double lon)
        {
            Latitude = lat;
            Longitude = lon;
        }

        public override string ToString() => $"({Latitude}, {Longitude})";
    }
}
