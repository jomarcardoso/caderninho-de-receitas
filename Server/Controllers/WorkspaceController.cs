using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Linq;
using System.Security.Claims;
using Server.Dtos;
using Server.Services;
using Server.Models;
using Server.Shared;

namespace Server.Controllers;

[ApiController]
[Route("api/workspace")]
[Authorize]
public class WorkspaceController : ControllerBase
{
  private readonly WorkspaceService _workspaceService;

  public WorkspaceController(WorkspaceService workspaceService)
  {
    _workspaceService = workspaceService;
  }

  private string GetUserId()
  {
    var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    return string.IsNullOrWhiteSpace(id) ? string.Empty : id.Trim();
  }

  [HttpGet]
  public async Task<IActionResult> GetWorkspace()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var response = await _workspaceService.BuildWorkspaceResponseAsync(userId);
    return response is null ? NotFound() : Ok(response);
  }

  [HttpGet("index")]
  public async Task<IActionResult> GetWorkspaceIndex()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var response = await _workspaceService.BuildWorkspaceIndexResponseAsync(userId);
    return response is null ? NotFound() : Ok(response);
  }
}
