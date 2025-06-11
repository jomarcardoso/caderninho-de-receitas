using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/food")]
    public class FoodController : Controller
    {
        // GET: FoodController
        public ActionResult Index()
        {
            return View();
        }

        // GET: FoodController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: FoodController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FoodController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                System.Console.WriteLine("try");
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                System.Console.WriteLine("cat");
                return View();
            }
        }

        // GET: FoodController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: FoodController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FoodController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: FoodController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
