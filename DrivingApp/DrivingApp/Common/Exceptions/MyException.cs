using System;

namespace DrivingApp.Common.Exceptions
{
	public class MyException : Exception
	{
		public MyException(string message)
			: base(message)
		{
		}
	}
}
