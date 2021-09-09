using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Messeger.Startup))]
namespace Messeger
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
