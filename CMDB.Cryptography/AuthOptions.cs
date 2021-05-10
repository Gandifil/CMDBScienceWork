using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace CMDB.Cryptography
{
    public class AuthOptions
    {
        public const string ISSUER = "CMDBISSUER"; // издатель токена

        public const string AUDIENCE = "CMDBCLIENT"; // потребитель токена

        const string KEY = "wdvtogb inuqw34jhikhtvaloeirsg aserwo'g uhaer bp9";   // ключ для шифрации\

        public const int LIFETIME_MINUTES = 60 * 4; // время жизни токена - 1 минута

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
