using ChatAppV2.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatAppV2.Hubs
{
    public class ChatHub:Hub
    {
        public async Task SendMessage(Message message) =>
            await Clients.All.SendAsync("receiveMessage", message);
    }
}
