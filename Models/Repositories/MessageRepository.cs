using Dapper;
using Messeger.Models.db;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Messeger.Models.Repositories
{
    public class MessageRepository
    {
        string СonnectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public List<Message> GetUsers()
        {
            List<Message> Messages = new List<Message>();
            using (IDbConnection db = new SqlConnection(СonnectionString))
            {
                Messages = db.Query<Message>("SELECT * FROM Messages").ToList();
            }
            return Messages;
        }

        public void AddMessage(Message message)
        {
            List<Message> Messages = new List<Message>();
            using (IDbConnection db = new SqlConnection(СonnectionString))
            {
                string Query = "INSERT INTO Messages (Text,Date) VALUES (@Text, @Date)";
                db.Execute(Query, message);
            }
        }
    }
}