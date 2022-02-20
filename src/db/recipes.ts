import { format, formatNacional } from './utils';
import { FoodData } from '../services/food';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { chickenPasty, cornRecipe } from './src';
import foodListNacional from './src/cadastro-nacional/food-list.json';

export const recipesData: Array<FoodData> = [
  {
    ...format(cornRecipe as unknown as FoodMyFoodData),
    ...formatNacional(foodListNacional[61] as unknown as FoodNacional),
    name: 'Polenta',
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
    name: 'pastel',
    icon: '/images/food/pasty.svg',
    image:
      'https://s2.glbimg.com/w5pW4yBkSibfdkhkDE-GGVYd21I=/0x0:1080x608/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/P/A/rfLBcEQhizbQPhwoBQew/capas-para-materias-gshow-home-2-.jpg',
    description: 'pastel de frango, frito',
    recipe: true,
  },
  {
    name: 'Bolo de cenoura',
    gi: 67,
    icon: '/images/food/carrot-cake.svg',
    image:
      'https://d1uz88p17r663j.cloudfront.net/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg',
    unitOfMeasurement: 'gram',
    recipe: true,
  },
  {
    name: 'Cuca',
    icon: '/images/food/bread.svg',
    image: 'https://cdn.panelinha.com.br/receita/1550859492306-cuca-banana.jpg',
    unitOfMeasurement: 'gram',
    recipe: true,
  },
  {
    name: 'Sanduíche',
    icon: '/images/food/sandwich.svg',
    image:
      'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80',
    recipe: true,
  },
  {
    name: 'Galinhada',
    icon: '/images/food/rice.svg',
    image:
      'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=731&q=80',
    keys: ['risoto de frango', 'arroz com galinha', 'arroz com frango'],
    recipe: true,
  },
  {
    ...formatNacional(foodListNacional[536] as unknown as FoodNacional),
    name: 'Estrogonofe de Carne',
    icon: '/images/food/stroganoff.png',
    image:
      'https://piracanjuba.com.br/content/receitas/cont/0000000056/rec056_1910.jpg',
    keys: ['strogonofe', 'estrogonofe'],
    recipe: true,
  },
  {
    ...formatNacional(foodListNacional[537] as unknown as FoodNacional),
    name: 'Estrogonofe de Frango',
    icon: '/images/food/stroganoff.png',
    image:
      'https://img.cybercook.com.br/imagens/receitas/644/strogonoff-de-frango-1-840x480.jpg?q=75',
    keys: ['strogonofe', 'estrogonofe'],
    recipe: true,
  },
  {
    name: 'Guacamole',
    icon: '/images/food/guacamole.png',
    image: 'https://cdn.panelinha.com.br/receita/1513697612821-guacamole.jpg',
    recipe: true,
    keys: ['guacamole'],
  },
  {
    name: 'Molho de Limão e Mel para Salada',
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
    name: 'Pão de Batata Doce',
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
    name: 'Sopa de Couve-flor',
    recipe: true,
    icon: '/images/food/soup.svg',
    image:
      'https://cdn.panelinha.com.br/receita/1468292400000-Sopa-de-couve-flor-com-farofinha-de-pao.jpg',
    keys: ['sopa de couve-flor', 'sopa de couve flor'],
  },
  {
    name: 'Caldo de Legumes',
    image:
      'https://cdn.panelinha.com.br/receita/1339470000000-Caldo-caseiro-de-legumes.jpg',
    keys: ['caldo de legume', 'caldo de legumes'],
    recipe: true,
  },
  {
    name: 'Salada de macarrão com beringela e purê de beterraba',
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
    name: 'Arroz doce, caramelizado com farofa',
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
    name: 'Rodelas de abobrinha crocantes com parmesão',
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
    name: 'Arroz carreteiro',
    image:
      'https://panelinha-sitenovo.s3.sa-east-1.amazonaws.com/receita/1633350306253-Panelinha_03_09_21_319.jpg',
    keys: ['risoto', 'carreteiro', 'arroz com carne'],
    recipe: true,
  },
  {
    name: 'Sopa de cenoura com curry',
    image: 'https://cdn.panelinha.com.br/receita/1491332195377-300541.jpg',
    keys: ['sopa de copo', 'sopa de cenoura', 'sopa de curry'],
    recipe: true,
  },
  {
    name: 'Cuscuz marroquino com filé mignon suíno',
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
    name: 'Geleia de manga e maracujá',
    image:
      'https://cdn.panelinha.com.br/receita/1540583468204-receita-geleiaaaaa.jpg',
    keys: ['geleia de manga', 'geleia de maracujá', 'geleia', 'geléia'],
    recipe: true,
  },
  {
    name: 'Vinagrete de chuchu com cominho',
    image:
      'https://cdn.panelinha.com.br/receita/1584364750707-vinagrete-de-chuchu.jpg',
    keys: ['vinagrete de chuchu', 'vinagrete', 'vinagrete com cominho'],
    recipe: true,
  },
  {
    name: 'Brownie cremoso de castanha-do-pará',
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
    name: 'Filé de frango grelhado com páprica e erva-doce',
    image:
      'https://cdn.panelinha.com.br/receita/1612811291559-FRANGO-GRELHADO.jpg',
    keys: [
      'filé de frango frango',
      'frango grelhado',
      'frango grelhado com páprica',
      'frango grelhado com páprica e erva-doce',
    ],
    recipe: true,
  },
  {
    name: 'Clotted cream',
    image:
      'https://cdn.panelinha.com.br/receita/1632170181467-clotted-cream.jpg',
    keys: ['clotted cream', 'clotted cream caseiro'],
    recipe: true,
  },
  {
    name: 'Café de prensa',
    image:
      'https://cdn.panelinha.com.br/receita/1544023469159-cafe%CC%81%20prensa.jpg',
    keys: ['café prensado', 'café de prensa', 'café'],
    recipe: true,
  },
  {
    name: 'Torta de banana',
    image:
      'https://cdn.panelinha.com.br/receita/1597953473440-tortareceita.jpg',
    keys: ['torta', 'torta de banana'],
    recipe: true,
  },
  {
    name: 'Suco refrescante de melão',
    image:
      'https://cdn.panelinha.com.br/receita/1445306400000-Suco-refrescante-de-melao.jpg',
    keys: ['suco', 'suco de melão', 'suco refrescante'],
    recipe: true,
  },
  {
    name: 'Sanduíche de atum',
    image:
      'https://cdn.panelinha.com.br/receita/1570025865685-1544637932547-sandui%CC%81che%20pasta.jpg',
    keys: ['sanduíche', 'sanduíche de atum'],
    recipe: true,
  },
  {
    name: 'Mate com limão',
    image:
      'https://cdn.panelinha.com.br/receita/1511900022715-mate%20receita.jpg',
    keys: ['mate', 'mate com limão', 'chá mate', 'chá mate com limão'],
    recipe: true,
  },
  {
    name: 'Bolinho de bacalhau com inhame',
    image:
      'https://cdn.panelinha.com.br/receita/1478224800000-Bolinho-de-bacalhau-com-inhame.jpg',
    keys: ['bolinho', 'bolinho de bacalhau', 'bolo de inhame'],
    recipe: true,
  },
  {
    name: 'Caipirinha de maracujá com gengibre e folhas de mexerica',
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
    name: 'Gim tônica cítrica',
    image:
      'https://cdn.panelinha.com.br/receita/1349060400000-Gim-tonica-citrica.jpg',
    keys: ['gim', 'gim tonica', 'gim tonica cítrica'],
    recipe: true,
  },
  {
    name: 'Crudités de legumes',
    image:
      'https://cdn.panelinha.com.br/receita/1450058400000-Crudites-de-legumes.jpg',
    keys: ['crudités', 'crudités de legumes', 'crudite', 'crudité de legume'],
    recipe: true,
  },
  {
    name: 'Dip de feijão branco',
    image:
      'https://cdn.panelinha.com.br/receita/1391652000000-Dip-de-feijao-branco.jpg',
    keys: ['dip', 'dip de feijão', 'dip de feijão branco'],
    recipe: true,
  },
  {
    name: 'Pão integral com nozes',
    image:
      'https://cdn.panelinha.com.br/receita/1515091594755-pa%CC%83o%20nozes%20receita.jpg',
    keys: ['pão', 'pão integral', 'pão integral com nozes', 'pão com nozes'],
    recipe: true,
  },
  {
    name: 'Geleia de figo e vinho tinto',
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
    name: 'Rabanada salgada com queijo',
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
    name: 'Salada de frutas com nibs de cacau',
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
    name: 'Cocada de forno',
    image: 'https://cdn.panelinha.com.br/receita/1554380728519-IMG_9235-2.jpg',
    keys: ['cocada', 'cocada de forno'],
    recipe: true,
  },
  {
    name: 'Feijão-carioca com cominho',
    image: 'https://cdn.panelinha.com.br/receita/1489425336617-301213.jpg',
    keys: ['feijão', 'feijão carioca', 'feijão carioca com cominho'],
    recipe: true,
  },
  {
    name: 'Carne com batata e cenoura na panela de pressão',
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
    name: 'Pizza de muçarela',
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
    name: 'Musse de chocolate',
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
    name: 'Salada de cebola com pepino e molho de coentro',
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
    name: 'Gratinado de batata com frango',
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
    name: 'Massa caseira com semolina',
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
    name: 'Sopa de feijão com macarrão',
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
    name: 'Farofa de milho com cenoura e bacon',
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
    name: 'Cuscuz nordestino',
    image:
      'https://s2.glbimg.com/0BsLY23sXDUg6wyeawk3Ur39CW0=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/H/m/TB0qseRj2xqTSntdQRPQ/cuscuz.jpg',
    icon: '/images/food/corn-flour.svg',
    keys: ['cuscuz', 'cuscuz nordestino'],
  },
  {
    ...formatNacional(foodListNacional[533] as unknown as FoodNacional),
    name: 'Cuscuz à paulista',
    image:
      'https://t2.rg.ltmcdn.com/pt/images/8/8/0/img_cuscuz_a_paulista_88_600.jpg',
    icon: '/images/food/corn-flour.svg',
    keys: ['cuscuz à paulista', 'cuscuz paulista', 'cuscuz a paulista'],
  },
  {
    ...formatNacional(foodListNacional[538] as unknown as FoodNacional),
    name: 'Feijão tropeiro mineiro',
    image:
      'https://www.comidaereceitas.com.br/wp-content/uploads/2021/02/feijao_tropeiro_mineiro-780x426.jpg',
    icon: '/images/food/bean.svg',
    keys: [
      'feijão tropeiro mineiro',
      'feijão tropeiro',
      'feijão mineiro',
      'feijão com tropeiro com torresmo',
      'feijão tropeiro com couve',
    ],
  },
  {
    ...formatNacional(foodListNacional[539] as unknown as FoodNacional),
    name: 'Feijoada',
    image:
      'https://cdn.panelinha.com.br/receita/1588270905274-39_Panelinha_12_02_200635.jpg',
    icon: '/images/food/bean.svg',
    keys: ['feijoada', 'feijoada completa'],
  },
  {
    ...formatNacional(foodListNacional[543] as unknown as FoodNacional),
    name: 'Quibebe',
    image:
      'https://cdn.panelinha.com.br/receita/1555347218472-CP-2019-29-01_6544.jpg',
    icon: '/images/food/mashed-potato.png',
    keys: [
      'quibebe',
      'purê de abóbora',
      'quibebe de abóbora',
      'quibebe de mandioca',
    ],
  },
  {
    ...formatNacional(foodListNacional[547] as unknown as FoodNacional),
    name: 'Sarapatel',
    image:
      'https://t1.rg.ltmcdn.com/pt/images/1/0/9/sarapatel_nordestino_2901_orig.jpg',
    icon: '/images/food/nabe.png',
    keys: ['sarapatel', 'sarapatel nordestino', 'sarapatel tradicional'],
  },
  {
    ...formatNacional(foodListNacional[549] as unknown as FoodNacional),
    name: 'Tacacá',
    image:
      'https://t1.rg.ltmcdn.com/pt/images/5/1/9/img_tacaca_paraense_2915_orig.jpg',
    icon: '/images/food/soup.svg',
    keys: ['tacacá', 'tacacá paraense', 'tacacá do norte', 'tacacá do pará'],
  },
  {
    ...formatNacional(foodListNacional[550] as unknown as FoodNacional),
    name: 'Caldo de tucupi',
    image:
      'https://t2.rg.ltmcdn.com/pt/images/7/1/7/caldo_de_tucupi_2717_600.jpg',
    icon: '/images/food/yellow-sauce.png',
    keys: ['caldo de tucupi', 'tucupi', 'tucupi de mandioca'],
  },
  {
    name: 'Arroz com figo seco e especiarias',
    image:
      'https://cdn.panelinha.com.br/receita/1608244418784-arroz%20com%20figo%20e%20cebola%20blog.jpg',
    keys: [
      'arroz com figo',
      'arroz com figo seco',
      'arroz com figo seco e especiarias',
    ],
    recipe: true,
  },
  {
    name: 'Salada de feijão branco com salsão',
    image:
      'https://cdn.panelinha.com.br/receita/1636125267265-branco-salsao-limao.jpg',
    keys: [
      'salada de feijão',
      'salada de feijão branco',
      'salada de feijão branco com salsão',
    ],
    recipe: true,
  },
  {
    name: 'Bisteca grelhada',
    image:
      'https://cdn.panelinha.com.br/receita/1468206000000-Bisteca-grelhada.jpg',
    recipe: true,
  },
  {
    name: 'Homus com cordeiro',
    image: 'https://cdn.panelinha.com.br/receita/1632776457017-homus.jpg',
    recipe: true,
    keys: ['humus com cordeiro', 'homus com cordeiro'],
  },
  {
    name: 'Homus',
    image:
      'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2019/03/homus-1024x768.jpg',
    recipe: true,
    keys: ['homus', 'hômus', 'humus', 'pasta de grão de bico'],
  },
  {
    name: 'Pasta de alho',
    image:
      'https://www.momentocomida.com.br/wp-content/uploads/2018/01/maxresdefault.jpg',
    recipe: true,
    keys: ['pasta de alho'],
  },
  {
    name: 'Frango na panela de pressão',
    image:
      'https://amp.bonde.com.br/mrf4u/statics/i/ps/www.bonde.com.br/img/bondenews/2018/07/img_1_33_1482.jpg?width=1200&enable=upscale',
    keys: [
      'frango na panela de pressão',
      'molho de frango',
      'molho de frango com tomate',
    ],
  },
];
