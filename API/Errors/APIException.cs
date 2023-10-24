namespace API.Errors;

public class APIException
{
    public APIException(int sttatusCode, string message, string details)
    {
        StatusCode = sttatusCode;
        Message = message;
        Details = details;
    }

    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }
}
