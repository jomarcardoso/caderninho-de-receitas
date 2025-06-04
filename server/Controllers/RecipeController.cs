using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    public class RecipeController : Controller
    {
        // GET: RecipeController
        public ActionResult Index()
        {
            return View();
        }

        // GET: RecipeController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: RecipeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: RecipeController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
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

        // GET: RecipeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: RecipeController/Edit/5
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

        // GET: RecipeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: RecipeController/Delete/5
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
