using api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace api.Services;

public class MongoDBService
{

  private readonly IMongoCollection<User> _userCollection;
  private readonly IMongoCollection<News> _newsCollection;

  public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
  {
    MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
    IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
    _userCollection = database.GetCollection<User>(mongoDBSettings.Value.CollectionName);
    _newsCollection = database.GetCollection<News>("News");
  }

  public async Task<List<User>> GetAsync()
  {
    return await _userCollection.Find(new BsonDocument()).ToListAsync();
  }
  public async Task CreateAsync(User user)
  {
    await _userCollection.InsertOneAsync(user);
    return;
  }
  public async Task AddToUserAsync(string id, string name)
  {
    FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
    UpdateDefinition<User> update = Builders<User>.Update.AddToSet<string>("name", name);
    await _userCollection.UpdateOneAsync(filter, update);
    return;
  }
  public async Task DeleteAsync(string id)
  {
    FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
    await _userCollection.DeleteOneAsync(filter);
    return;
  }

  public async Task<User?> AuthenticateAsync(string email, string password)
  {
    // Find the user by email
    var user = await _userCollection.Find(u => u.email == email).FirstOrDefaultAsync();

    if (user != null)
    {
      // Ensure PasswordHash is valid and matches the given password
      bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

      if (isPasswordValid)
      {
        return user; // Return the user if the password is valid
      }
    }

    return null; // Return null if authentication fails
  }

  // Métodos relacionados a News
  public async Task<List<News>> GetNewsAsync()
  {
    return await _newsCollection.Find(new BsonDocument()).ToListAsync();
  }

  public async Task<List<News>> GetNewsByTitleAsync(string title)
  {
    var filter = Builders<News>.Filter.Regex("Title", new BsonRegularExpression(title, "i"));
    return await _newsCollection.Find(filter).ToListAsync();
    // return await _newsCollection.Find(news => news.Title == title).ToListAsync();
  }

  public async Task<News> GetNewsByIdAsync(string id)
  {
    return await _newsCollection.Find(news => news.Id == id).FirstOrDefaultAsync();
  }

  public async Task CreateNewsAsync(News news)
  {
    await _newsCollection.InsertOneAsync(news);
    return;
  }

  public async Task UpdateNewsAsync(string id, News updatedNews)
  {
    await _newsCollection.ReplaceOneAsync(news => news.Id == id, updatedNews);
    return;
  }

  public async Task DeleteNewsAsync(string id)
  {
    FilterDefinition<News> filter = Builders<News>.Filter.Eq("Id", id);
    await _newsCollection.DeleteOneAsync(filter);
    return;
  }

  public async Task<User> GetUserByIdAsync(string id)
  {
    return await _userCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
  }

  public async Task AddToUserAsync(string id, User updatedUser)
  {
    var filter = Builders<User>.Filter.Eq(u => u.Id, id); // Filtro para encontrar o usuário pelo id
    var update = Builders<User>.Update
        .Set(u => u.name, updatedUser.name) // Atualizando o campo Name
        .Set(u => u.email, updatedUser.email) // Atualizando o campo Email
        .Set(u => u.PasswordHash, updatedUser.PasswordHash) // Atualizando o campo PasswordHash (se necessário)
        .Set(u => u.Profile, updatedUser.Profile); // Atualizando o campo Profile (se necessário)

    await _userCollection.UpdateOneAsync(filter, update);
  }

  public async Task IncrementNewsLikesAsync(string id)
  {
    var filter = Builders<News>.Filter.Eq(n => n.Id, id);
    var update = Builders<News>.Update.Inc(n => n.Likes, 1); // Incrementa o campo Likes em 1
    await _newsCollection.UpdateOneAsync(filter, update);
  }
}