using Messeger.Models.Chat;
using Messeger.Models.Repositories;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Messeger.Hubs
{
    public class ChatHub:Hub
    {
        private static readonly MessageRepository MessageRepos = new MessageRepository();
        static List<User> Users = new List<User>();
        public void Send(string name, string message)
        {
            var Id = Context.ConnectionId;
            try
            {
                MessageRepos.AddMessage(new Models.db.Message() { Date = DateTime.Now, Text = message });
            }
            catch (Exception ex)
            {
            }
            Clients.All.addMessage(name, message,Id);
        }

        public void Connect(string userName)
        {
            var Id = Context.ConnectionId;

            if(!Users.Any(x=>x.ConnectionId == Id))
            {
                Users.Add(new User() { ConnectionId = Id, Name = userName });

                Clients.Caller.onConnected(Id, userName, Users);
                Clients.AllExcept(Id).onNewUserConnected(Id, userName);

            }
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var DisconectedUser = Users.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);

            if(DisconectedUser!=null)
            {
                Users.Remove(DisconectedUser);
                Clients.All.onUserDisconnected(Context.ConnectionId, DisconectedUser.Name);
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}