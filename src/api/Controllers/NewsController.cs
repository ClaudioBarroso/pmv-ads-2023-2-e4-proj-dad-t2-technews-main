using Microsoft.AspNetCore.Mvc;
using api.Services;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controllers
{
  [Controller]
  [Route("api/[controller]")]
  public class NewsController : Controller
  {
    private readonly MongoDBService _mongoDBService;

    public NewsController(MongoDBService mongoDBService)
    {
      _mongoDBService = mongoDBService;
    }

    // GET: api/news
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? title)
    {
      if (string.IsNullOrEmpty(title))
      {
        // If no title is provided, return all news
        return Ok(await _mongoDBService.GetNewsAsync());
      }

      // Fetch news by title
      var newsItems = await _mongoDBService.GetNewsByTitleAsync(title);
      if (newsItems == null || !newsItems.Any())
      {
        return NotFound("News not found");
      }

      return Ok(newsItems);
    }

    [Authorize]
    // GET: api/news/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
      var newsItem = await _mongoDBService.GetNewsByIdAsync(id);
      if (newsItem == null)
      {
        return NotFound("News not found");
      }

      var user = await _mongoDBService.GetUserByIdAsync(newsItem.UserId);
      if (user == null)
      {
        return NotFound("Associated user not found");
      }

      var response = new
      {
        News = newsItem,
        User = user
      };

      return Ok(response);
    }

    // POST: api/news
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] News news)
    {
      var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
      if (userIdClaim == null)
      {
        return Unauthorized("User is not authenticated");
      }

      news.UserId = userIdClaim.Value;

      await _mongoDBService.CreateNewsAsync(news);
      return CreatedAtAction(nameof(GetById), new { id = news.Id }, news);
    }

    // PUT: api/news/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNews(string id, [FromBody] News updatedNews)
    {
      var existingNews = await _mongoDBService.GetNewsByIdAsync(id);
      if (existingNews is null)
      {
        return NotFound("News not found");
      }

      await _mongoDBService.UpdateNewsAsync(id, updatedNews);
      return NoContent();
    }

    // DELETE: api/news/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
      var existingNews = await _mongoDBService.GetNewsByIdAsync(id);
      if (existingNews == null)
      {
        return NotFound("News not found");
      }

      await _mongoDBService.DeleteNewsAsync(id);
      return NoContent();
    }

    [Authorize]
    [HttpPost("{id}/like")]
    public async Task<IActionResult> LikeNews(string id)
    {
      var newsItem = await _mongoDBService.GetNewsByIdAsync(id);
      if (newsItem == null)
      {
        return NotFound("News not found");
      }

      // Incrementar o número de likes
      await _mongoDBService.IncrementNewsLikesAsync(id);
        return Ok(new { message = "Notícia curtidad com sucesso", likes = newsItem.Likes + 1 });
    }
  }
}
