using CDMB.Common.Database;
using System;
using Xunit;

namespace CMDB.Common.Tests
{
    public class EquipmentTests: IClassFixture<TestFixture>
    {
        private ApplicationContext context;

        public EquipmentTests(ApplicationContext context)
        {
            this.context = context;
        }

        [Fact]
        public void Test1()
        {

        }
    }
}
