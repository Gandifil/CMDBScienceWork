using CDMB.Common;
using Microsoft.Extensions.DependencyInjection;

namespace CMDB.Common.Tests
{
    class TestFixture
    {
        public TestFixture()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddCMDB();
            serviceCollection.AddDbContext<TestDbContext>();
            ServiceProvider = serviceCollection.BuildServiceProvider();
        }

        public ServiceProvider ServiceProvider { get; private set; }

    }
}
