import { format, formatNacional } from './utils';
import { FoodData } from '../services/food';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { chickenPasty, cornRecipe } from './src';
import foodListNacional from './src/cadastro-nacional/food-list.json';

export const recipesData: Array<FoodData> = [
  {
    ...format(cornRecipe as unknown as FoodMyFoodData),
    ...formatNacional(foodListNacional[61] as unknown as FoodNacional),
    id: 10000,
    name: 'Polenta',
    enName: 'corn-meal',
    gi: 74,
    gl: 11,
    icon: '/images/food/polenta.svg',
    image: 'https://t2.rg.ltmcdn.com/pt/images/4/9/1/polenta_mole_194_600.jpg',
    calories: 0,
    carbohydrates: 21,
    oneMeasures: [
      {
        quantity: 233,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: 'gram',
    recipe: true,
  },
  {
    ...format(chickenPasty as unknown as FoodMyFoodData),
    id: 10001,
    name: 'pastel',
    enName: 'pasty',
    icon: '/images/food/pasty.svg',
    image:
      'https://s2.glbimg.com/w5pW4yBkSibfdkhkDE-GGVYd21I=/0x0:1080x608/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/P/A/rfLBcEQhizbQPhwoBQew/capas-para-materias-gshow-home-2-.jpg',
    description: 'pastel de frango, frito',
    recipe: true,
  },
  {
    id: 10002,
    name: 'Bolo de cenoura',
    enName: 'carrot-cake',
    gi: 67,
    icon: '/images/food/carrot-cake.svg',
    image:
      'https://d1uz88p17r663j.cloudfront.net/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg',
    unitOfMeasurement: 'gram',
    recipe: true,
  },
  {
    id: 10003,
    name: 'Cuca',
    icon: '/images/food/bread.svg',
    image: 'https://cdn.panelinha.com.br/receita/1550859492306-cuca-banana.jpg',
    enName: 'crumb-cake',
    unitOfMeasurement: 'gram',
    recipe: true,
  },
  {
    id: 10004,
    name: 'Sanduíche',
    enName: 'sandwich',
    icon: '/images/food/sandwich.svg',
    image:
      'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80',
    recipe: true,
  },
  {
    id: 10005,
    name: 'Galinhada',
    enName: 'chicken-risotto',
    icon: '/images/food/rice.svg',
    image:
      'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=731&q=80',
    keys: ['risoto de frango', 'arroz com galinha', 'arroz com frango'],
    recipe: true,
  },
  {
    id: 10006,
    name: 'Estrogonofe de Carne',
    enName: 'beef-stroganoff',
    icon: '/images/food/stroganoff.png',
    image:
      'https://piracanjuba.com.br/content/receitas/cont/0000000056/rec056_1910.jpg',
    keys: ['strogonofe', 'estrogonofe'],
    recipe: true,
  },
  {
    id: 10007,
    name: 'Estrogonofe de Frango',
    enName: 'chicken-stroganoff',
    icon: '/images/food/stroganoff.png',
    image:
      'https://img.cybercook.com.br/imagens/receitas/644/strogonoff-de-frango-1-840x480.jpg?q=75',
    keys: ['strogonofe', 'estrogonofe'],
    recipe: true,
  },
  {
    id: 10008,
    name: 'Guacamole',
    enName: 'guacamole',
    icon: '/images/food/guacamole.png',
    image: 'https://cdn.panelinha.com.br/receita/1513697612821-guacamole.jpg',
    recipe: true,
    keys: ['guacamole'],
  },
  {
    id: 10009,
    name: 'Molho de Limão e Mel para Salada',
    enName: 'lemon-and-honey-salad-dressing',
    icon: '/images/food/sauce.png',
    image:
      'https://cdn.panelinha.com.br/receita/1619447331360-molho%2011.07.16.jpg',
    recipe: true,
    keys: [
      'molho de limão e mel para salada',
      'molho de salada',
      'molho para salada',
      'molho pra   salada',
      'molho de limão',
      'molho de mel',
    ],
  },
  {
    id: 10010,
    name: 'Pão de Batata Doce',
    enName: 'sweet-potato-bread',
    icon: '/images/food/bread.png',
    image:
      'https://cdn.panelinha.com.br/receita/1544639354405-pa%CC%83o%20de%20batata-doce%20para%20trocar.jpg',
    keys: [
      'pão de batata doce',
      'bolinho de batata',
      'bolinho de batata doce',
      'bolinho de batata-doce',
      'pão de batata-doce',
    ],
    recipe: true,
  },
  {
    id: 10011,
    name: 'Sopa de Couve-flor',
    enName: 'cauliflower-soup',
    recipe: true,
    icon: '/images/food/soup.svg',
    image:
      'https://cdn.panelinha.com.br/receita/1468292400000-Sopa-de-couve-flor-com-farofinha-de-pao.jpg',
    keys: ['sopa de couve-flor', 'sopa de couve flor'],
  },
  {
    id: 10012,
    name: 'Caldo de Legumes',
    enName: 'vegetable-broth',
    image:
      'https://cdn.panelinha.com.br/receita/1339470000000-Caldo-caseiro-de-legumes.jpg',
    keys: ['caldo de legume', 'caldo de legumes'],
    recipe: true,
  },
  {
    id: 10013,
    name: 'Salada de macarrão com beringela e purê de beterraba',
    enName: 'beetroot-eggplant-pastas-salad',
    image:
      'https://cdn.panelinha.com.br/receita/1461898800000-Salada-de-macarrao-com-berinjela-e-pure-de-beterraba.jpg',
    keys: [
      'salada de beterraba',
      'salada de beringela',
      'salada de beterraba',
      'purê de beterraba',
    ],
    recipe: true,
  },
  {
    id: 10014,
    name: 'Arroz doce, caramelizado com farofa',
    enName: 'sweet-rice-caramelized-with-crumbs',
    image:
      'http://www.cookbookfritzefrida.com.br/assets/uploads/posts/710/g_thumb-whatsapp-image-2021-09-29-at-150825-8647128-6175614.jpeg',
    keys: [
      'arroz code',
      'arroz doce caramelizado',
      'arroz doce com farofa',
      'arroz doce caramelizado com fafora',
    ],
    recipe: true,
  },
  {
    id: 10015,
    name: 'Rodelas de abobrinha crocantes com parmesão',
    enName: 'Crispy zucchini slices with parmesan',
    image:
      'https://panelinha-sitenovo.s3.sa-east-1.amazonaws.com/receita/1632429758157-CP2021-12-05_0474.jpg',
    keys: [
      'rodelas de abobrinha',
      'abobrinha assada',
      'abobrinha com parmesão',
    ],
    recipe: true,
  },
  {
    id: 10016,
    name: 'Arroz carreteiro',
    enName: 'beef-risoto',
    image:
      'https://panelinha-sitenovo.s3.sa-east-1.amazonaws.com/receita/1633350306253-Panelinha_03_09_21_319.jpg',
    keys: ['risoto', 'carreteiro', 'arroz com carne'],
    recipe: true,
  },
  {
    id: 10017,
    name: 'Sopa de cenoura com curry',
    enName: 'carrot-soup-with-curry',
    image: 'https://cdn.panelinha.com.br/receita/1491332195377-300541.jpg',
    keys: ['sopa de copo', 'sopa de cenoura', 'sopa de curry'],
    recipe: true,
  },
  {
    id: 10018,
    name: 'Cuscuz marroquino com filé mignon suíno',
    enName: 'couscous',
    image:
      'https://cdn.panelinha.com.br/receita/1480557600000-Cuscuz-marroquino-com-file-mignon-suino.jpg',
    keys: [
      'cuscuz marroquino',
      'cuscuz com carne',
      'cuscuz marroquino com porco',
      'cuscuz com porco',
    ],
    recipe: true,
  },
  {
    id: 10019,
    name: 'Geleia de manga e maracujá',
    enName: 'mango-and-passion-fruit-jelly',
    image:
      'https://cdn.panelinha.com.br/receita/1540583468204-receita-geleiaaaaa.jpg',
    keys: ['geleia de manga', 'geleia de maracujá', 'geleia', 'geléia'],
    recipe: true,
  },
  {
    id: 10020,
    name: 'Vinagrete de chuchu com cominho',
    enName: 'chuchu-vinegaret-with-cumin',
    image:
      'https://cdn.panelinha.com.br/receita/1584364750707-vinagrete-de-chuchu.jpg',
    keys: ['vinagrete de chuchu', 'vinagrete', 'vinagrete com cominho'],
    recipe: true,
  },
  {
    id: 10021,
    name: 'Brownie cremoso de castanha-do-pará',
    enName: 'creamy-brazil-nut-brownie',
    image:
      'https://cdn.panelinha.com.br/receita/1472612400000-Brownie-cremoso-de-castanha-do-para.jpg',
    keys: [
      'brownie',
      'brownie de castanha',
      'brownie com castanha',
      'brownie cremoso',
    ],
    recipe: true,
  },
  {
    id: 10022,
    name: 'Filé de frango grelhado com páprica e erva-doce',
    enName: 'grilled-chicken-fillet-with-paprika-and-fennel',
    image:
      'https://cdn.panelinha.com.br/receita/1612811291559-FRANGO-GRELHADO.jpg',
    keys: [
      'frango',
      'filé de frango frango',
      'frango grelhado',
      'frango grelhado com páprica',
      'frango grelhado com páprica e erva-doce',
    ],
    recipe: true,
  },
  {
    id: 10023,
    name: 'Clotted cream',
    enName: 'clotted-cream',
    image:
      'https://cdn.panelinha.com.br/receita/1632170181467-clotted-cream.jpg',
    keys: ['clotted cream', 'clotted cream caseiro'],
    recipe: true,
  },
  {
    id: 10024,
    name: 'Café de prensa',
    enName: 'pressed-coffee',
    image:
      'https://cdn.panelinha.com.br/receita/1544023469159-cafe%CC%81%20prensa.jpg',
    keys: ['café prensado', 'café de prensa', 'café'],
    recipe: true,
  },
  {
    id: 10025,
    name: 'Torta de banana',
    enName: 'banana-cake',
    image:
      'https://cdn.panelinha.com.br/receita/1597953473440-tortareceita.jpg',
    keys: ['torta', 'torta de banana'],
    recipe: true,
  },
  {
    id: 10026,
    name: 'Suco refrescante de melão',
    enName: 'refreshing-watermelon-juice',
    image:
      'https://cdn.panelinha.com.br/receita/1445306400000-Suco-refrescante-de-melao.jpg',
    keys: ['suco', 'suco de melão', 'suco refrescante'],
    recipe: true,
  },
  {
    id: 10027,
    name: 'Sanduíche de atum',
    enName: 'tuna-sandwich',
    image:
      'https://cdn.panelinha.com.br/receita/1570025865685-1544637932547-sandui%CC%81che%20pasta.jpg',
    keys: ['sanduíche', 'sanduíche de atum'],
    recipe: true,
  },
  {
    id: 10028,
    name: 'Mate com limão',
    enName: 'lime-juice-mate',
    image:
      'https://cdn.panelinha.com.br/receita/1511900022715-mate%20receita.jpg',
    keys: ['mate', 'mate com limão', 'chá mate', 'chá mate com limão'],
    recipe: true,
  },
  {
    id: 10029,
    name: 'Bolinho de bacalhau com inhame',
    enName: 'cod-dumpling-with-yam',
    image:
      'https://cdn.panelinha.com.br/receita/1478224800000-Bolinho-de-bacalhau-com-inhame.jpg',
    keys: ['bolinho', 'bolinho de bacalhau', 'bolo de inhame'],
    recipe: true,
  },
  {
    id: 10030,
    name: 'Caipirinha de maracujá com gengibre e folhas de mexerica',
    enName: 'passion-fruit-caipirinha-with-ginger-and-mexerica-leaves',
    image:
      'https://cdn.panelinha.com.br/receita/1457665200000-Caipirinha-de-maracuja-com-gengibre-e-folhas-de-mexerica.jpg',
    keys: [
      'caipirinha',
      'caipirinha de maracujá',
      'suco de maracujá',
      'caipirinha de maracujá com gengibre',
      'suco de maracujá com gengibre',
    ],
    recipe: true,
  },
  {
    id: 10031,
    name: 'Gim tônica cítrica',
    enName: 'citric-gim-tonica',
    image:
      'https://cdn.panelinha.com.br/receita/1349060400000-Gim-tonica-citrica.jpg',
    keys: ['gim', 'gim tonica', 'gim tonica cítrica'],
    recipe: true,
  },
  {
    id: 10032,
    name: 'Crudités de legumes',
    enName: 'legumes-crudites',
    image:
      'https://cdn.panelinha.com.br/receita/1450058400000-Crudites-de-legumes.jpg',
    keys: ['crudités', 'crudités de legumes', 'crudite', 'crudité de legume'],
    recipe: true,
  },
  {
    id: 10033,
    name: 'Dip de feijão branco',
    enName: 'white-bean-dip',
    image:
      'https://cdn.panelinha.com.br/receita/1391652000000-Dip-de-feijao-branco.jpg',
    keys: ['dip', 'dip de feijão', 'dip de feijão branco'],
    recipe: true,
  },
  {
    id: 10034,
    name: 'Pão integral com nozes',
    enName: 'integral-bread-with-nutmeg',
    image:
      'https://cdn.panelinha.com.br/receita/1515091594755-pa%CC%83o%20nozes%20receita.jpg',
    keys: ['pão', 'pão integral', 'pão integral com nozes', 'pão com nozes'],
    recipe: true,
  },
  {
    id: 10035,
    name: 'Geleia de figo e vinho tinto',
    enName: 'fig-and-wine-gelee',
    image:
      'https://cdn.panelinha.com.br/receita/1432609200000-Geleia-de-figo-e-vinho-tinto.jpg',
    keys: [
      'geleia',
      'geleia de figo',
      'geleia de figo e vinho',
      'geleia com vinho',
    ],
    recipe: true,
  },
  {
    id: 10036,
    name: 'Rabanada salgada com queijo',
    enName: 'grilled-salted-chicken-with-cheese',
    image:
      'https://cdn.panelinha.com.br/receita/1432609200000-Rabanada-salgada.jpg',
    keys: [
      'rabanada',
      'rabanada salgada',
      'rabanada salgada com queijo',
      'rabanada com queijo',
    ],
    recipe: true,
  },
  {
    id: 10037,
    name: 'Salada de frutas com nibs de cacau',
    enName: 'fruit-salad-with-cacao-nibs',
    image:
      'https://cdn.panelinha.com.br/receita/1459998000000-Salada-de-frutas-com-nibs-de-cacau.jpg',
    keys: [
      'salada de frutas',
      'salada de fruta',
      'salada de fruta com chocolate',
      'salada de frutas com chocolate',
      'salada de frutas com cacau',
      'salada de frutas com nibs de cacau',
    ],
    recipe: true,
  },
  {
    id: 10038,
    name: 'Cocada de forno',
    enName: 'baked-coconut-candy',
    image: 'https://cdn.panelinha.com.br/receita/1554380728519-IMG_9235-2.jpg',
    keys: ['cocada', 'cocada de forno'],
    recipe: true,
  },
  {
    id: 10039,
    name: 'Feijão-carioca com cominho',
    enName: 'bean-with-cumin',
    image: 'https://cdn.panelinha.com.br/receita/1489425336617-301213.jpg',
    keys: ['feijão', 'feijão carioca', 'feijão carioca com cominho'],
    recipe: true,
  },
  {
    id: 10040,
    name: 'Carne com batata e cenoura na panela de pressão',
    enName: 'meat-with-potato-and-carrot-in-pressure-pan',
    image:
      'https://cdn.panelinha.com.br/receita/1636135550572-carne-com-batata-pressao.jpg',
    keys: [
      'carne',
      'carne com batata',
      'carne com batata e cenoura',
      'carne com batata e cenoura na panela de pressão',
      'carne de panela',
      'carne na panela de pressão',
    ],
    recipe: true,
  },
  {
    id: 10041,
    name: 'Pizza de muçarela',
    enName: 'pizza-with-mozzarella',
    image:
      'https://cdn.panelinha.com.br/receita/1443495600000-Pizza-de-mucarela-caseira.jpg',
    keys: [
      'pizza',
      'pizza de mozarela',
      'pizza de muçarela',
      'pizza de mozzarella',
      'pizza muçarela',
      'pizza mozzarella',
      'pizza mozarela',
      'pizza de queijo muçarela',
      'pizza caseira',
      'pizza caseira de mozarela',
      'pizza caseira de muçarela',
      'pizza caseira de mozzarella',
    ],
    recipe: true,
  },
  {
    id: 10042,
    name: 'Musse de chocolate',
    enName: 'chocolate-mousse',
    image:
      'https://cdn.panelinha.com.br/receita/1427252400000-Musse-de-chocolate-levissima.jpg',
    keys: [
      'mousse',
      'mousse de chocolate',
      'mousse de chocolate levissima',
      'musse de chocolate',
      'musse',
    ],
    recipe: true,
  },
  {
    id: 10043,
    name: 'Salada de cebola com pepino e molho de coentro',
    enName: 'onion-and-pepino-and-coentro-salad',
    image:
      'https://cdn.panelinha.com.br/receita/1473649200000-Salada-de-cebola-com-pepino-e-molho-de-coentro.jpg',
    keys: [
      'salada',
      'salada de cebola',
      'salada de cebolas',
      'salada de cebola com pepino',
      'salada de cebola com pepinos',
      'salada de cebola com pepino e molho de coentro',
      'salada de cebola com pepinos e molho de coentro',
      'salada de cebolas com pepino',
      'salada de cebolas com pepinos',
      'salada de cebolas com pepino e molho de coentro',
      'salada de cebolas com pepinos e molho de coentro',
    ],
    recipe: true,
  },
  {
    id: 10044,
    name: 'Gratinado de batata com frango',
    enName: 'gratinado-of-potato-with-chicken',
    image:
      'https://cdn.panelinha.com.br/receita/1448503200000-Gratinado-de-batata-com-frango.jpg',
    keys: [
      'gratinado',
      'gratinado de batata',
      'gratinado de batata com frango',
    ],
    recipe: true,
  },
  {
    id: 10045,
    name: 'Massa caseira com semolina',
    enName: 'case-flour-with-semolina',
    image:
      'https://cdn.panelinha.com.br/receita/1623786205817-massa-caseira.jpg',
    keys: [
      'massa caseira',
      'massa caseira com semolina',
      'massa com semolina',
      'massa com sêmola',
      'massa caseira com sêmola',
    ],
    recipe: true,
  },
  {
    id: 10046,
    name: 'Macarrão com legumes assados',
    image:
      'https://cdn.panelinha.com.br/receita/1624481906297-macarra%CC%83o-legumes.jpg',
    keys: [
      'macarrão',
      'macarrão com legumes',
      'macarrão com legumes assados',
      'massa com legumes',
      'massa com legumes assados',
    ],
    recipe: true,
  },
  {
    id: 10047,
    name: 'Sopa de feijão com macarrão',
    enName: 'soup-of-bean-with-pasta',
    image:
      'https://cdn.panelinha.com.br/receita/1616683531341-sopa-de-feija%CC%83o-com-macarra%CC%83o.jpg',
    keys: [
      'sopa de feijão',
      'sopa de feijão com macarrão',
      'sopa de feijão e macarrão',
    ],
    recipe: true,
  },
  {
    id: 10048,
    name: 'Farofa de milho com cenoura e bacon',
    enName: 'millet-bread-with-cabbage-and-bacon',
    image: 'https://cdn.panelinha.com.br/receita/1639142039327-farofa.jpg',
    keys: [
      'farofa',
      'farofa de milho',
      'farofa de milho com cenoura',
      'farofa de milho com cenoura e bacon',
      'farofa de milho com bacon',
      'farofa com cenoura',
      'farofa com bacon',
    ],
    recipe: true,
  },
  {
    ...formatNacional(foodListNacional[532] as unknown as FoodNacional),
    id: 10049,
    name: 'Cuscuz nordestino',
    image:
      'https://s2.glbimg.com/0BsLY23sXDUg6wyeawk3Ur39CW0=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/H/m/TB0qseRj2xqTSntdQRPQ/cuscuz.jpg',
    icon: '/images/food/corn-flour.svg',
    keys: ['cuscuz', 'cuscuz nordestino'],
  },
  {
    ...formatNacional(foodListNacional[533] as unknown as FoodNacional),
    id: 10050,
    name: 'Cuscuz à paulista',
    image:
      'https://t2.rg.ltmcdn.com/pt/images/8/8/0/img_cuscuz_a_paulista_88_600.jpg',
    icon: '/images/food/corn-flour.svg',
    keys: ['cuscuz à paulista', 'cuscuz paulista', 'cuscuz a paulista'],
  },
];
