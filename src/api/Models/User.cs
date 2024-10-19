using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class User
{

  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }

  [BsonElement("name")]
  [BsonRepresentation(BsonType.String)]
  public string name { get; set; } = null!;

  public string email { get; set; } = null!;

  public string _passwordHash = null!;

  [BsonElement("password")]
  public string PasswordHash
  {
    get { return _passwordHash; }
    set { _passwordHash = value; }
  }

  [DataType(DataType.Password)]
  public string Password
  {
    set
    {
      _passwordHash = BCrypt.Net.BCrypt.HashPassword(value);
    }
  }

  public Profile Profile { get; set; } // Campo para armazenar o perfil ("usuário" ou "admin")
}

public enum Profile
{
  User = 0,
  Admin = 1
}