# Caderninho de Receitas - API
## Version: v1

---

### [GET] /api/Admin/food-matches/low-confidence
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| quantity | query |  | No | integer, <br>**Default:** 50 |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [POST] /api/Auth/google
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br>**text/json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br>**application/*+json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br> | **application/json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br>**text/json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br>**application/*+json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br> | **application/json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br>**text/json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br>**application/*+json**: [Server.Dtos.Auth.GoogleLoginRequestDto](#serverdtosauthgoogleloginrequestdto)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [Server.Dtos.Auth.GoogleLoginResponseDto](#serverdtosauthgoogleloginresponsedto)<br>**application/json**: [Server.Dtos.Auth.GoogleLoginResponseDto](#serverdtosauthgoogleloginresponsedto)<br>**text/json**: [Server.Dtos.Auth.GoogleLoginResponseDto](#serverdtosauthgoogleloginresponsedto)<br> |
| 401 | Unauthorized | **text/plain**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br>**application/json**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br>**text/json**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br> |

### [GET] /api/Auth/me
#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [Server.Dtos.Auth.GoogleLoginResponseDto](#serverdtosauthgoogleloginresponsedto)<br>**application/json**: [Server.Dtos.Auth.GoogleLoginResponseDto](#serverdtosauthgoogleloginresponsedto)<br>**text/json**: [Server.Dtos.Auth.GoogleLoginResponseDto](#serverdtosauthgoogleloginresponsedto)<br> |
| 401 | Unauthorized | **text/plain**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br>**application/json**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br>**text/json**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br> |

### [POST] /api/Auth/logout
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Auth/refresh
#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |
| 401 | Unauthorized | **text/plain**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br>**application/json**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br>**text/json**: [Microsoft.AspNetCore.Mvc.ProblemDetails](#microsoftaspnetcoremvcproblemdetails)<br> |

---

### [GET] /api/categories
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [POST] /api/category-edits
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br>**text/json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br>**application/*+json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br> | **application/json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br>**text/json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br>**application/*+json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br> | **application/json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br>**text/json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br>**application/*+json**: [Server.Controllers.CategoryEditsController.CreateEditDto](#servercontrollerscategoryeditscontrollercreateeditdto)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/category-edits/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/category-edits/pending
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| categoryId | query |  | No | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/category-edits/{id}/approve
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/category-edits/{id}/reject
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /auth/tiktok
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| redirect | query |  | No | string, <br>**Default:** / |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /auth/signout
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| redirect | query |  | No | string, <br>**Default:** / |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /api/food
#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [ [Server.Models.Food](#servermodelsfood) ]<br>**application/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**text/json**: [ [Server.Models.Food](#servermodelsfood) ]<br> |

### [POST] /api/food
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Models.Food](#servermodelsfood)<br>**text/json**: [Server.Models.Food](#servermodelsfood)<br>**application/*+json**: [Server.Models.Food](#servermodelsfood)<br> | **application/json**: [Server.Models.Food](#servermodelsfood)<br>**text/json**: [Server.Models.Food](#servermodelsfood)<br>**application/*+json**: [Server.Models.Food](#servermodelsfood)<br> | **application/json**: [Server.Models.Food](#servermodelsfood)<br>**text/json**: [Server.Models.Food](#servermodelsfood)<br>**application/*+json**: [Server.Models.Food](#servermodelsfood)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [Server.Models.Food](#servermodelsfood)<br>**application/json**: [Server.Models.Food](#servermodelsfood)<br>**text/json**: [Server.Models.Food](#servermodelsfood)<br> |

### [GET] /api/food/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [Server.Models.Food](#servermodelsfood)<br>**application/json**: [Server.Models.Food](#servermodelsfood)<br>**text/json**: [Server.Models.Food](#servermodelsfood)<br> |

### [POST] /api/food/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **multipart/form-data**: { **"Name.En"**: string, **"Name.Pt"**: string, **"Keys.En"**: string, **"Keys.Pt"**: string, **"Description.En"**: string, **"Description.Pt"**: string, **"Measures.Cup"**: double, **"Measures.SmallCup"**: double, **"Measures.Spoon"**: double, **"Measures.TeaSpoon"**: double, **"Measures.Unity"**: double, **"Measures.UnitySmall"**: double, **"Measures.UnityLarge"**: double, **"Measures.Can"**: double, **"Measures.Glass"**: double, **"Measures.Breast"**: double, **"Measures.Clove"**: double, **"Measures.Slice"**: double, **"Measures.Bunch"**: double, **"Measures.Pinch"**: double, **"NutritionalInformation.Acidification"**: double, **"NutritionalInformation.Ashes"**: double, **"NutritionalInformation.Calories"**: double, **"NutritionalInformation.Carbohydrates"**: double, **"NutritionalInformation.Cholesterol"**: double, **"NutritionalInformation.DietaryFiber"**: double, **"NutritionalInformation.Gi"**: double, **"NutritionalInformation.Gl"**: double, **"NutritionalInformation.MonounsaturatedFats"**: double, **"NutritionalInformation.PolyunsaturatedFats"**: double, **"NutritionalInformation.Proteins"**: double, **"NutritionalInformation.SaturedFats"**: double, **"NutritionalInformation.Sugar"**: double, **"NutritionalInformation.TotalFat"**: double, **"Minerals.Calcium"**: double, **"Minerals.Copper"**: double, **"Minerals.Fluoride"**: double, **"Minerals.Iron"**: double, **"Minerals.Magnesium"**: double, **"Minerals.Manganese"**: double, **"Minerals.Phosphorus"**: double, **"Minerals.Potassium"**: double, **"Minerals.Selenium"**: double, **"Minerals.Sodium"**: double, **"Minerals.Zinc"**: double, **"Vitamins.A"**: double, **"Vitamins.AlphaCarotene"**: double, **"Vitamins.B1"**: double, **"Vitamins.B11"**: double, **"Vitamins.B12"**: double, **"Vitamins.B2"**: double, **"Vitamins.B3"**: double, **"Vitamins.B5"**: double, **"Vitamins.B6"**: double, **"Vitamins.B7"**: double, **"Vitamins.B9"**: double, **"Vitamins.BetaCarotene"**: double, **"Vitamins.C"**: double, **"Vitamins.Choline"**: double, **"Vitamins.CryptoxanthinCarotene"**: double, **"Vitamins.D"**: double, **"Vitamins.D2"**: double, **"Vitamins.D3"**: double, **"Vitamins.E"**: double, **"Vitamins.K"**: double, **"Vitamins.Lycopene"**: double, **"AminoAcids.Alanine"**: double, **"AminoAcids.Arginine"**: double, **"AminoAcids.AsparticAcid"**: double, **"AminoAcids.Cystine"**: double, **"AminoAcids.GlutamicAcid"**: double, **"AminoAcids.Glutamine"**: double, **"AminoAcids.Glycine"**: double, **"AminoAcids.Histidine"**: double, **"AminoAcids.Isoleucine"**: double, **"AminoAcids.Leucine"**: double, **"AminoAcids.Lysine"**: double, **"AminoAcids.Methionine"**: double, **"AminoAcids.Phenylalanine"**: double, **"AminoAcids.Proline"**: double, **"AminoAcids.Serine"**: double, **"AminoAcids.Threonine"**: double, **"AminoAcids.Tryptophan"**: double, **"AminoAcids.Tyrosine"**: double, **"AminoAcids.Valine"**: double, **"EssentialAminoAcids.Histidine"**: double, **"EssentialAminoAcids.Isoleucine"**: double, **"EssentialAminoAcids.Leucine"**: double, **"EssentialAminoAcids.Lysine"**: double, **"EssentialAminoAcids.Methionine"**: double, **"EssentialAminoAcids.Phenylalanine"**: double, **"EssentialAminoAcids.Threonine"**: double, **"EssentialAminoAcids.Tryptophan"**: double, **"EssentialAminoAcids.Valine"**: double, **"AminoAcidsScore"**: double, **"Id"**: integer, **"Imgs"**: [ string ], **"MeasurementUnit"**: [Server.Shared.MeasurementUnit](#serversharedmeasurementunit), **"Categories"**: [ string ], **"IconId"**: integer, **"Icon"**: string, **"IconData.Id"**: integer, **"IconData.Name.En"**: string, **"IconData.Name.Pt"**: string, **"IconData.Url"**: string, **"IconData.Keys.En"**: string, **"IconData.Keys.Pt"**: string, **"Type"**: [Server.Shared.FoodType](#serversharedfoodtype) }<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/food/many
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**text/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**application/*+json**: [ [Server.Models.Food](#servermodelsfood) ]<br> | **application/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**text/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**application/*+json**: [ [Server.Models.Food](#servermodelsfood) ]<br> | **application/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**text/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**application/*+json**: [ [Server.Models.Food](#servermodelsfood) ]<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [Server.Models.Food](#servermodelsfood)<br>**application/json**: [Server.Models.Food](#servermodelsfood)<br>**text/json**: [Server.Models.Food](#servermodelsfood)<br> |

### [GET] /api/food/search
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| text | query |  | No | string |
| limit | query |  | No | integer, <br>**Default:** 25 |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [ [Server.Models.Food](#servermodelsfood) ]<br>**application/json**: [ [Server.Models.Food](#servermodelsfood) ]<br>**text/json**: [ [Server.Models.Food](#servermodelsfood) ]<br> |

### [GET] /api/food/search-images
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| text | query |  | No | string |
| limit | query |  | No | integer, <br>**Default:** 25 |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [ [Server.Controllers.FoodController.FoodImageSearchResult](#servercontrollersfoodcontrollerfoodimagesearchresult) ]<br>**application/json**: [ [Server.Controllers.FoodController.FoodImageSearchResult](#servercontrollersfoodcontrollerfoodimagesearchresult) ]<br>**text/json**: [ [Server.Controllers.FoodController.FoodImageSearchResult](#servercontrollersfoodcontrollerfoodimagesearchresult) ]<br> |

---

### [POST] /api/food-edits
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br>**text/json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br>**application/*+json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br> | **application/json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br>**text/json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br>**application/*+json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br> | **application/json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br>**text/json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br>**application/*+json**: [Server.Controllers.FoodEditsController.CreateEditDto](#servercontrollersfoodeditscontrollercreateeditdto)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/food-edits/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/food-edits/pending
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| foodId | query |  | No | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/food-edits/{id}/approve
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/food-edits/{id}/reject
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [POST] /api/food-icons
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**text/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**application/*+json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br> | **application/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**text/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**application/*+json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br> | **application/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**text/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**application/*+json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/food-icons
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/food-icons/many
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br>**text/json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br>**application/*+json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br> | **application/json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br>**text/json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br>**application/*+json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br> | **application/json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br>**text/json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br>**application/*+json**: [ [Server.Dtos.FoodIconDto](#serverdtosfoodicondto) ]<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/food-icons/map
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| names | query |  | No | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/food-icons/map-by-id
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| ids | query |  | No | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/food-icons/search
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| q | query |  | No | string |
| limit | query |  | No | integer, <br>**Default:** 25 |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/food-icons/all
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [PUT] /api/food-icons/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**text/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**application/*+json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br> | **application/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**text/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**application/*+json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br> | **application/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**text/json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br>**application/*+json**: [Server.Dtos.FoodIconDto](#serverdtosfoodicondto)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /api/Health
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Health/ping
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [POST] /api/Recipe
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**text/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**application/*+json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br> | **application/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**text/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**application/*+json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br> | **application/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**text/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**application/*+json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Recipe
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Recipe/many
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br>**text/json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br>**application/*+json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br> | **application/json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br>**text/json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br>**application/*+json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br> | **application/json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br>**text/json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br>**application/*+json**: [ [Server.Dtos.RecipeDto](#serverdtosrecipedto) ]<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [PUT] /api/Recipe/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**text/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**application/*+json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br> | **application/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**text/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**application/*+json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br> | **application/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**text/json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br>**application/*+json**: [Server.Dtos.RecipeDto](#serverdtosrecipedto)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [DELETE] /api/Recipe/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Recipe/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |
| count | query |  | No | integer, <br>**Default:** 5 |
| excludeIds | query |  | No | string |
| excludeSameOwner | query |  | No | boolean, <br>**Default:** true |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Recipe/pending
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Recipe/{id}/approve
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Recipe/{id}/deny
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Recipe/search
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| text | query |  | No | string |
| categories | query |  | No | string |
| quantity | query |  | No | integer, <br>**Default:** 20 |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Recipe/categories
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Recipe/relations/rebuild
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| topPerRecipe | query |  | No | integer, <br>**Default:** 10 |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Recipe/relations/rebuild
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| topPerRecipe | query |  | No | integer, <br>**Default:** 10 |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Recipe/most-copied
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| quantity | query |  | No | integer, <br>**Default:** 6 |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /api/RecipeLists
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/RecipeLists
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**text/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**application/*+json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br> | **application/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**text/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**application/*+json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br> | **application/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**text/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**application/*+json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [PUT] /api/RecipeLists/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**text/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**application/*+json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br> | **application/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**text/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**application/*+json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br> | **application/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**text/json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br>**application/*+json**: [Server.Controllers.RecipeListsController.UpsertListPayload](#servercontrollersrecipelistscontrollerupsertlistpayload)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [DELETE] /api/RecipeLists/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/RecipeLists/{id}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/RecipeLists/{id}/recipes/{recipeId}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |
| recipeId | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [DELETE] /api/RecipeLists/{id}/recipes/{recipeId}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path |  | Yes | integer |
| recipeId | path |  | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /api/Share/recipe/{slug}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| slug | path |  | Yes | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Share/recipe
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br>**text/json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br>**application/*+json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br> | **application/json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br>**text/json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br>**application/*+json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br> | **application/json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br>**text/json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br>**application/*+json**: [Server.Controllers.ShareController.RecipeShareCreateRequest](#servercontrollerssharecontrollerrecipesharecreaterequest)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Share/recipe/{slug}/copy
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| slug | path |  | Yes | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Share/recipe/{slug}/data
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| slug | path |  | Yes | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [POST] /api/Uploads/sas
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br>**text/json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br>**application/*+json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br> | **application/json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br>**text/json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br>**application/*+json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br> | **application/json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br>**text/json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br>**application/*+json**: [Server.Controllers.UploadsController.SasRequest](#servercontrollersuploadscontrollersasrequest)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [Server.Controllers.UploadsController.SasResponse](#servercontrollersuploadscontrollersasresponse)<br>**application/json**: [Server.Controllers.UploadsController.SasResponse](#servercontrollersuploadscontrollersasresponse)<br>**text/json**: [Server.Controllers.UploadsController.SasResponse](#servercontrollersuploadscontrollersasresponse)<br> |

### [POST] /api/Uploads/optimize-webp
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **multipart/form-data**: { **"File"**: binary, **"MaxWidth"**: integer, **"MaxHeight"**: integer, **"Quality"**: integer, **"Method"**: [SixLabors.ImageSharp.Formats.Webp.WebpEncodingMethod](#sixlaborsimagesharpformatswebpwebpencodingmethod), **"NearLossless"**: boolean, **"StripMetadata"**: boolean }<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Uploads/recipes
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **multipart/form-data**: { **"File"**: binary, **"MaxWidth"**: integer, **"MaxHeight"**: integer, **"Quality"**: integer, **"Method"**: [SixLabors.ImageSharp.Formats.Webp.WebpEncodingMethod](#sixlaborsimagesharpformatswebpwebpencodingmethod), **"NearLossless"**: boolean, **"StripMetadata"**: boolean, **"Prefix"**: string }<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Uploads/icons
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **multipart/form-data**: { **"File"**: binary, **"MaxWidth"**: integer, **"MaxHeight"**: integer, **"Quality"**: integer, **"Method"**: [SixLabors.ImageSharp.Formats.Webp.WebpEncodingMethod](#sixlaborsimagesharpformatswebpwebpencodingmethod), **"NearLossless"**: boolean, **"StripMetadata"**: boolean, **"Prefix"**: string }<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /api/UserProfile/me
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [PUT] /api/UserProfile/me
#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br>**text/json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br>**application/*+json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br> | **application/json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br>**text/json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br>**application/*+json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br> | **application/json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br>**text/json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br>**application/*+json**: [Server.Dtos.UpdateUserProfileRequest](#serverdtosupdateuserprofilerequest)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /api/Users/me
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Users/featured
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| quantity | query |  | No | integer, <br>**Default:** 6 |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [GET] /api/Users/{ownerId}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| ownerId | path |  | Yes | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [POST] /api/Users/feature/{ownerId}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| ownerId | path |  | Yes | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### [DELETE] /api/Users/feature/{ownerId}
#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| ownerId | path |  | Yes | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

---

### [GET] /WeatherForecast
#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | **text/plain**: [ [Server.WeatherForecast](#serverweatherforecast) ]<br>**application/json**: [ [Server.WeatherForecast](#serverweatherforecast) ]<br>**text/json**: [ [Server.WeatherForecast](#serverweatherforecast) ]<br> |

---
### Schemas

#### Microsoft.AspNetCore.Mvc.ProblemDetails

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| type | string |  | No |
| title | string |  | No |
| status | integer |  | No |
| detail | string |  | No |
| instance | string |  | No |

#### Server.Controllers.CategoryEditsController.CreateEditDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| categoryId | integer |  | No |
| payload |  |  | No |

#### Server.Controllers.FoodController.FoodImageSearchResult

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| foodId | integer |  | No |
| name | string |  | No |
| imgs | [ string ] |  | No |

#### Server.Controllers.FoodEditsController.CreateEditDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| foodId | integer |  | No |
| payload |  |  | No |

#### Server.Controllers.RecipeListsController.UpsertListPayload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | No |
| description | string |  | No |
| isPublic | boolean |  | No |

#### Server.Controllers.ShareController.RecipeShareCreateRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| recipeId | integer |  | No |
| isPublic | boolean |  | No |

#### Server.Controllers.UploadsController.SasRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| fileName | string |  | No |
| contentType | string |  | No |
| prefix | string |  | No |

#### Server.Controllers.UploadsController.SasResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| uploadUrl | string |  | No |
| blobUrl | string |  | No |
| expiresOn | dateTime |  | No |

#### Server.Dtos.Auth.GoogleLoginRequestDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| idToken | string |  | Yes |

#### Server.Dtos.Auth.GoogleLoginResponseDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| displayName | string |  | No |
| email | string |  | No |
| picture | string |  | No |
| googleId | string |  | No |
| emailVerified | boolean |  | No |
| roles | [ string ] |  | No |

#### Server.Dtos.FoodIconDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | No |
| url | string |  | No |
| keys | [Server.Shared.LanguageTextBase](#serversharedlanguagetextbase) |  | No |

#### Server.Dtos.RecipeDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| name | string |  | No |
| keys | string |  | No |
| description | string |  | No |
| additional | string |  | No |
| steps | [ [Server.Dtos.RecipeStepDto](#serverdtosrecipestepdto) ] |  | No |
| language | [Server.Shared.Language](#serversharedlanguage) |  | No |
| categories | [ string ] |  | No |
| imgs | [ string ] |  | No |

#### Server.Dtos.RecipeStepDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string |  | No |
| preparation | string |  | No |
| additional | string |  | No |
| ingredientsText | string |  | No |

#### Server.Dtos.UpdateUserProfileRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| bio | string |  | No |
| theme | [Server.Models.ThemeColor](#servermodelsthemecolor) |  | No |
| isPublic | boolean |  | No |
| verified | boolean |  | No |
| allergies | [ [Server.Models.AllergyRestriction](#servermodelsallergyrestriction) ] |  | No |
| intolerances | [ [Server.Models.IntoleranceRestriction](#servermodelsintolerancerestriction) ] |  | No |
| medicalRestrictions | [ [Server.Models.MedicalRestriction](#servermodelsmedicalrestriction) ] |  | No |
| dietStyles | [ [Server.Models.DietStyleRestriction](#servermodelsdietstylerestriction) ] |  | No |
| culturalRestrictions | [ [Server.Models.CulturalRestriction](#servermodelsculturalrestriction) ] |  | No |
| personalPreferences | [ [Server.Models.PersonalPreferenceRestriction](#servermodelspersonalpreferencerestriction) ] |  | No |

#### Server.Models.AllergyRestriction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Models.AllergyRestriction | string |  |  |

#### Server.Models.AminoAcids

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| alanine | double |  | No |
| arginine | double |  | No |
| asparticAcid | double |  | No |
| cystine | double |  | No |
| glutamicAcid | double |  | No |
| glutamine | double |  | No |
| glycine | double |  | No |
| histidine | double |  | No |
| isoleucine | double |  | No |
| leucine | double |  | No |
| lysine | double |  | No |
| methionine | double |  | No |
| phenylalanine | double |  | No |
| proline | double |  | No |
| serine | double |  | No |
| threonine | double |  | No |
| tryptophan | double |  | No |
| tyrosine | double |  | No |
| valine | double |  | No |

#### Server.Models.CulturalRestriction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Models.CulturalRestriction | string |  |  |

#### Server.Models.DietStyleRestriction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Models.DietStyleRestriction | string |  |  |

#### Server.Models.EssentialAminoAcids

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| histidine | double |  | No |
| isoleucine | double |  | No |
| leucine | double |  | No |
| lysine | double |  | No |
| methionine | double |  | No |
| phenylalanine | double |  | No |
| threonine | double |  | No |
| tryptophan | double |  | No |
| valine | double |  | No |

#### Server.Models.Food

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| name | [Server.Models.LanguageText](#servermodelslanguagetext) |  | No |
| description | [Server.Models.LanguageText](#servermodelslanguagetext) |  | No |
| imgs | [ string ] |  | No |
| measurementUnit | [Server.Shared.MeasurementUnit](#serversharedmeasurementunit) |  | No |
| measures | [Server.Models.Measure](#servermodelsmeasure) |  | No |
| keys | [Server.Models.LanguageText](#servermodelslanguagetext) |  | No |
| categories | [ string ] |  | No |
| iconId | integer |  | No |
| icon | [Server.Models.FoodIcon](#servermodelsfoodicon) |  | No |
| type | [Server.Shared.FoodType](#serversharedfoodtype) |  | No |
| nutritionalInformation | [Server.Models.NutritionalInformation](#servermodelsnutritionalinformation) |  | No |
| minerals | [Server.Models.Minerals](#servermodelsminerals) |  | No |
| vitamins | [Server.Models.Vitamins](#servermodelsvitamins) |  | No |
| aminoAcids | [Server.Models.AminoAcids](#servermodelsaminoacids) |  | No |
| essentialAminoAcids | [Server.Models.EssentialAminoAcids](#servermodelsessentialaminoacids) |  | No |
| aminoAcidsScore | double |  | No |

#### Server.Models.FoodIcon

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| name | [Server.Models.LanguageText](#servermodelslanguagetext) |  | No |
| url | string |  | No |
| keys | [Server.Models.LanguageText](#servermodelslanguagetext) |  | No |

#### Server.Models.IntoleranceRestriction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Models.IntoleranceRestriction | string |  |  |

#### Server.Models.LanguageText

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| en | string |  | No |
| pt | string |  | No |

#### Server.Models.Measure

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| cup | double |  | No |
| smallCup | double |  | No |
| spoon | double |  | No |
| teaSpoon | double |  | No |
| unity | double |  | No |
| unitySmall | double |  | No |
| unityLarge | double |  | No |
| can | double |  | No |
| glass | double |  | No |
| breast | double |  | No |
| clove | double |  | No |
| slice | double |  | No |
| bunch | double |  | No |
| pinch | double |  | No |

#### Server.Models.MedicalRestriction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Models.MedicalRestriction | string |  |  |

#### Server.Models.Minerals

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| calcium | double |  | No |
| copper | double |  | No |
| fluoride | double |  | No |
| iron | double |  | No |
| magnesium | double |  | No |
| manganese | double |  | No |
| phosphorus | double |  | No |
| potassium | double |  | No |
| selenium | double |  | No |
| sodium | double |  | No |
| zinc | double |  | No |

#### Server.Models.NutritionalInformation

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| acidification | double |  | No |
| ashes | double |  | No |
| calories | double |  | No |
| carbohydrates | double |  | No |
| cholesterol | double |  | No |
| dietaryFiber | double |  | No |
| gi | double |  | No |
| gl | double |  | No |
| monounsaturatedFats | double |  | No |
| polyunsaturatedFats | double |  | No |
| proteins | double |  | No |
| saturedFats | double |  | No |
| sugar | double |  | No |
| totalFat | double |  | No |

#### Server.Models.PersonalPreferenceRestriction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Models.PersonalPreferenceRestriction | string |  |  |

#### Server.Models.ThemeColor

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Models.ThemeColor | string |  |  |

#### Server.Models.Vitamins

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| a | double |  | No |
| alphaCarotene | double |  | No |
| b1 | double |  | No |
| b11 | double |  | No |
| b12 | double |  | No |
| b2 | double |  | No |
| b3 | double |  | No |
| b5 | double |  | No |
| b6 | double |  | No |
| b7 | double |  | No |
| b9 | double |  | No |
| betaCarotene | double |  | No |
| c | double |  | No |
| choline | double |  | No |
| cryptoxanthinCarotene | double |  | No |
| d | double |  | No |
| d2 | double |  | No |
| d3 | double |  | No |
| e | double |  | No |
| k | double |  | No |
| lycopene | double |  | No |

#### Server.Shared.AminoAcidsBase

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| alanine | double |  | No |
| arginine | double |  | No |
| asparticAcid | double |  | No |
| cystine | double |  | No |
| glutamicAcid | double |  | No |
| glutamine | double |  | No |
| glycine | double |  | No |
| histidine | double |  | No |
| isoleucine | double |  | No |
| leucine | double |  | No |
| lysine | double |  | No |
| methionine | double |  | No |
| phenylalanine | double |  | No |
| proline | double |  | No |
| serine | double |  | No |
| threonine | double |  | No |
| tryptophan | double |  | No |
| tyrosine | double |  | No |
| valine | double |  | No |

#### Server.Shared.FoodType

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Shared.FoodType | string |  |  |

#### Server.Shared.Language

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Shared.Language | string |  |  |

#### Server.Shared.LanguageTextBase

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| en | string |  | No |
| pt | string |  | No |

#### Server.Shared.MeasureBase

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| cup | double |  | No |
| smallCup | double |  | No |
| spoon | double |  | No |
| teaSpoon | double |  | No |
| unity | double |  | No |
| unitySmall | double |  | No |
| unityLarge | double |  | No |
| can | double |  | No |
| glass | double |  | No |
| breast | double |  | No |
| clove | double |  | No |
| slice | double |  | No |
| bunch | double |  | No |
| pinch | double |  | No |

#### Server.Shared.MeasurementUnit

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Server.Shared.MeasurementUnit | string |  |  |

#### Server.Shared.MineralsBase

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| calcium | double |  | No |
| copper | double |  | No |
| fluoride | double |  | No |
| iron | double |  | No |
| magnesium | double |  | No |
| manganese | double |  | No |
| phosphorus | double |  | No |
| potassium | double |  | No |
| selenium | double |  | No |
| sodium | double |  | No |
| zinc | double |  | No |

#### Server.Shared.NutritionalInformationBase

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| acidification | double |  | No |
| ashes | double |  | No |
| calories | double |  | No |
| carbohydrates | double |  | No |
| cholesterol | double |  | No |
| dietaryFiber | double |  | No |
| gi | double |  | No |
| gl | double |  | No |
| monounsaturatedFats | double |  | No |
| polyunsaturatedFats | double |  | No |
| proteins | double |  | No |
| saturedFats | double |  | No |
| sugar | double |  | No |
| totalFat | double |  | No |

#### Server.Shared.VitaminsBase

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| a | double |  | No |
| alphaCarotene | double |  | No |
| b1 | double |  | No |
| b11 | double |  | No |
| b12 | double |  | No |
| b2 | double |  | No |
| b3 | double |  | No |
| b5 | double |  | No |
| b6 | double |  | No |
| b7 | double |  | No |
| b9 | double |  | No |
| betaCarotene | double |  | No |
| c | double |  | No |
| choline | double |  | No |
| cryptoxanthinCarotene | double |  | No |
| d | double |  | No |
| d2 | double |  | No |
| d3 | double |  | No |
| e | double |  | No |
| k | double |  | No |
| lycopene | double |  | No |

#### Server.WeatherForecast

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| date | date |  | No |
| temperatureC | integer |  | No |
| temperatureF | integer |  | No |
| summary | string |  | No |

#### SixLabors.ImageSharp.Formats.Webp.WebpEncodingMethod

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| SixLabors.ImageSharp.Formats.Webp.WebpEncodingMethod | string |  |  |
