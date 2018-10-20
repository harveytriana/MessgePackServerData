using MessgePackServerData.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace MessgePackServerData.Hubs
{
    public class BooksHub : Hub
    {
        public async Task GetBook()
        {
            // dummy sample
            var book = new Book {
                Id = 469,
                Author = "John Lennon",
                Title = "In his own write",
                Price = 223.99,
                Date = DateTime.Now // for test
            };

            // similates experience
            await Task.Delay(1000);

            await Clients.All.SendAsync("RaiseResult", book);
        }
    }
}
