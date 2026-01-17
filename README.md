# Caderninho de Receitas

[![Build Status](https://travis-ci.org/jomarcardoso/cadertinho-de-receitas-2.svg?branch=master)](https://travis-ci.org/jomarcardoso/cadertinho-de-receitas-2)

Acesso o aplicativo em

- https://caderninho-de-receitas.web.app
- https://caderninho-de-receitas.firebaseapp.com

<!-- - https://caderninho-de-receitas.surge.sh -->

| ![screen of edit recipe](https://github.com/jomarcardoso/jomarcardoso/assets/27368585/f487ffe2-e54a-43bb-bf44-061e7e6c859c) | ![screen of ingredients](https://user-images.githubusercontent.com/27368585/217540894-c23ed355-2918-405e-b719-b5c79b9bed58.png) | ![screen of recipes](https://user-images.githubusercontent.com/27368585/217540549-5974c04a-bbcd-4895-947c-7ff7b82289ed.png) | ![screen of current recipe](https://user-images.githubusercontent.com/27368585/217540753-bd259231-70d7-4973-93b9-74f7ada93ed3.png) |
| --- | --- | --- | --- |


## Proposta de valor

Problemas que a aplicação resolve:

- **Dor:** passar uma receita para outra pessoa. **Solução:** compartilhar as receitas de forma prática.
- **Dor:** em dietas com restrição calórica há muito trabalho para calcular uma receita com mais ingredientes. **Solução:** auxiliar na dieta dos pontos

## Cores

- [Paleta](https://coolors.co/4d7a60-5d5e60-8d8d92-beb2c8-d7d6d6)

## Frutas

- https://www.flaticon.com/packs/fruits-and-vegetables-6?k=1588129484491
- https://jakearchibald.github.io/svgomg/

## Tabelas

- http://www.intranet.fcf.usp.br/tabela/lista.asp?base=r
- https://www.diabetes.org.br/publico/images/pdf/2016/nutr-2002-foster-powell-5-56.pdf
- [Tabela Brasileira de Composição de Alimentos](https://www.cfn.org.br/wp-content/uploads/2017/03/taco_4_edicao_ampliada_e_revisada.pdf)
- [amino ácidos](https://www.scielo.br/pdf/rbz/v30n3/5247.pdf)
- [site com busca de alimentos dos aminoácidos](https://tools.myfooddata.com/nutrition-comparison.php?foods=173735&serv=100g&qty=1)
- [json de alimento](https://tools.myfooddata.com/api/food/Eggs)
- [TACO 4](https://www.cfn.org.br/wp-content/uploads/2017/03/taco_4_edicao_ampliada_e_revisada.pdf)
- [pesos](https://endocrinosaude.com/tabela-de-calorias/frutas-e-castanhas-2/)

## Imagens

- https://www.svgrepo.com/
- https://www.flaticon.com/
- https://freeicons.io/

- https://pixabay.com/images/
- https://unsplash.com/s/photos/

## Fontes

- Sacramento (cursiva)

## Ícones futuros

- [Farinha de milho 2](https://www.flaticon.com/premium-icon/corn_4127166?term=corn&page=3&position=25&page=3&position=25&related_id=4127166&origin=search)
- [farinha de milho](https://www.flaticon.com/premium-icon/corn_1676841?term=corn&page=1&position=65)
- [feijão](https://www.flaticon.com/premium-icon/red-beans_2079330?term=bean&page=1&position=60)
- [presunto](https://www.flaticon.com/premium-icon/ham_2069197?term=ham&page=1&position=11)
- [alface](https://www.flaticon.com/premium-icon/lettuce_1682268?term=lettuce&page=4&position=91)
- [alho](https://www.flaticon.com/premium-icon/garlic_2518056?term=garlic&page=1&position=71)
- [cenoura](https://www.flaticon.com/premium-icon/carrots_924384?term=carrot&page=1&position=54)
- [abacate](https://www.flaticon.com/premium-icon/avocado_2079291?term=avocado&page=1&position=49)
- [granola/aveia](https://www.flaticon.com/premium-icon/breakfast_1652097?term=oats&page=1&position=38)
- [bolo de cenoura](https://www.flaticon.com/premium-icon/carrot-cake_2447809?term=carrot%20cake&page=1&position=2&page=1&position=2&related_id=2447809&origin=search)
- [açucar](https://www.flaticon.com/premium-icon/sugar_2315968?term=sugar&page=1&position=11&page=1&position=11&related_id=2315968&origin=search)
- [Milho](https://www.flaticon.com/premium-icon/corn_2303677?term=corn&page=1&position=64&page=1&position=64&related_id=2303677&origin=search)
- [Molho de tomate](https://www.flaticon.com/premium-icon/sauce_3093568?term=sauce&page=1&position=6&page=1&position=6&related_id=3093568&origin=search)
- [Salsa](https://www.flaticon.com/free-icon/parsley_680947?term=parsley&page=1&position=8&page=1&position=8&related_id=680947&origin=search)

## URL Shortener

Chave: `ZkK6gSuEoZNv`.

https://url.gratis/user/tools/api

## Configuração do firebase

Se for usar...

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCFHCTJPeBpA8h45eSHDJYWGV9vCrkbQ0w",
    authDomain: "cadertinho-de-receitas.firebaseapp.com",
    projectId: "cadertinho-de-receitas",
    storageBucket: "cadertinho-de-receitas.appspot.com",
    messagingSenderId: "1017781542177",
    appId: "1:1017781542177:web:0383d995b31965eef23260",
    measurementId: "G-0LT1TTRNVC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
```

## Storyset

https://storyset.com/illustration/chef/bro/animate?share=38917

https://storyset.com/illustration/cooking/bro/animate?share=38930

https://storyset.com/illustration/order-food/bro/animate?share=38946

## Ícones

https://ionic.io/ionicons

https://react-icons.github.io/react-icons
