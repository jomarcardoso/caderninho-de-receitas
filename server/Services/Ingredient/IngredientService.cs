using Microsoft.Extensions.Caching.Memory;

namespace server.Services.Ingredient
{
    public class IngredientService
    {
    // private readonly IMemoryCachehe _cache;

    //     public IngredientService(IMemoryCache cache)
    //     {
    //         _cache = cache;
    //     }

    //     public async Task<string> GetDataAsync(string key)
    //     {
    //         // tenta pegar do cache
    //         if (_cache.TryGetValue(key, out string cachedData))
    //         {
    //             return cachedData;
    //         }

    //         // se não tiver no cache, busca de alguma fonte externa
    //         string data = await CallExternalApi(key);

    //         // salva no cache com tempo de expiração
    //         _cache.Set(key, data, TimeSpan.FromMinutes(5));

    //         return data;
    //     }

    //     private Task<string> CallExternalApi(string key)
    //     {
    //         // simulação de chamada externa
    //         return Task.FromResult($"Resposta para {key} em {DateTime.Now}");
    //     }
    }
}
