using ChatAppV2.Data;
using ChatAppV2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace ChatAppV2.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public readonly ApplicationDbContext _context;

        public readonly UserManager<AppUser> _userManager;

        public HomeController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (User.Identity.IsAuthenticated)
            {
                ViewBag.CurrentUserName = currentUser.UserName;
            }
            //var messages = await _context.Messages.ToListAsync();
            var item = await (
             from msg in _context.Messages
             join snd in _context.AppUsers on msg.UserID equals snd.Id
             select new Message
             {
                 Id = msg.Id,
                 UserName = msg.UserName,
                 Text = msg.Text,
                 CreatedOn = msg.CreatedOn,
                 UserID = snd.Id,
                 Sender = snd
             }).ToListAsync();

            return View("Index2",item);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Message message)
        {

            var sender = await _userManager.GetUserAsync(User);
            message.UserName = User.Identity.Name;
            message.UserID = sender.Id;
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return Ok();
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}