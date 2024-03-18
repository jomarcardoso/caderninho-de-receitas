import { formatNacional } from './utils';
import { FoodData } from '../services/food';
import { FoodNacional } from './db.types';
import foodListNacional from './src/cadastro-nacional/food-list.json';

export const recipes: Array<FoodData> = [
  {
    name: 'Rodelas de abobrinha crocantes com parmesão',
    image:
      'https://panelinha-sitenovo.s3.sa-east-1.amazonaws.com/receita/1632429758157-CP2021-12-05_0474.jpg',
    keys: [
      'rodelas de abobrinha',
      'abobrinha assada',
      'abobrinha com parmesão',
    ],
  },
  {
    name: 'Arroz carreteiro',
    image:
      'https://panelinha-sitenovo.s3.sa-east-1.amazonaws.com/receita/1633350306253-Panelinha_03_09_21_319.jpg',
    keys: ['risoto', 'carreteiro', 'arroz com carne'],
  },
  {
    name: 'Sopa de cenoura com curry',
    image: 'https://cdn.panelinha.com.br/receita/1491332195377-300541.jpg',
    keys: ['sopa de copo', 'sopa de cenoura', 'sopa de curry'],
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
  },
  {
    name: 'Geleia de manga e maracujá',
    image:
      'https://cdn.panelinha.com.br/receita/1540583468204-receita-geleiaaaaa.jpg',
    keys: ['geleia de manga', 'geleia de maracujá', 'geleia', 'geléia'],
  },
  {
    name: 'Vinagrete de chuchu com cominho',
    image:
      'https://cdn.panelinha.com.br/receita/1584364750707-vinagrete-de-chuchu.jpg',
    keys: ['vinagrete de chuchu', 'vinagrete', 'vinagrete com cominho'],
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
  },
  {
    name: 'Clotted cream',
    image:
      'https://cdn.panelinha.com.br/receita/1632170181467-clotted-cream.jpg',
    keys: ['clotted cream', 'clotted cream caseiro'],
  },
  {
    name: 'Café de prensa',
    image:
      'https://cdn.panelinha.com.br/receita/1544023469159-cafe%CC%81%20prensa.jpg',
    keys: ['café prensado', 'café de prensa', 'café'],
  },
  {
    name: 'Torta de banana',
    image:
      'https://cdn.panelinha.com.br/receita/1597953473440-tortareceita.jpg',
    keys: ['torta', 'torta de banana'],
  },
  {
    name: 'Suco refrescante de melão',
    image:
      'https://cdn.panelinha.com.br/receita/1445306400000-Suco-refrescante-de-melao.jpg',
    keys: ['suco', 'suco de melão', 'suco refrescante'],
  },
  {
    name: 'Sanduíche de atum',
    image:
      'https://cdn.panelinha.com.br/receita/1570025865685-1544637932547-sandui%CC%81che%20pasta.jpg',
    keys: ['sanduíche', 'sanduíche de atum'],
  },
  {
    name: 'Mate com limão',
    image:
      'https://cdn.panelinha.com.br/receita/1511900022715-mate%20receita.jpg',
    keys: ['mate', 'mate com limão', 'chá mate', 'chá mate com limão'],
  },
  {
    name: 'Bolinho de bacalhau com inhame',
    image:
      'https://cdn.panelinha.com.br/receita/1478224800000-Bolinho-de-bacalhau-com-inhame.jpg',
    keys: ['bolinho', 'bolinho de bacalhau', 'bolo de inhame'],
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
  },
  {
    name: 'Gim tônica cítrica',
    image:
      'https://cdn.panelinha.com.br/receita/1349060400000-Gim-tonica-citrica.jpg',
    keys: ['gim', 'gim tonica', 'gim tonica cítrica'],
  },
  {
    name: 'Crudités de legumes',
    image:
      'https://cdn.panelinha.com.br/receita/1450058400000-Crudites-de-legumes.jpg',
    keys: ['crudités', 'crudités de legumes', 'crudite', 'crudité de legume'],
  },
  {
    name: 'Dip de feijão branco',
    image:
      'https://cdn.panelinha.com.br/receita/1391652000000-Dip-de-feijao-branco.jpg',
    keys: ['dip', 'dip de feijão', 'dip de feijão branco'],
  },
  {
    name: 'Pão integral com nozes',
    image:
      'https://cdn.panelinha.com.br/receita/1515091594755-pa%CC%83o%20nozes%20receita.jpg',
    keys: ['pão', 'pão integral', 'pão integral com nozes', 'pão com nozes'],
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
  },
  {
    name: 'Cocada de forno',
    image: 'https://cdn.panelinha.com.br/receita/1554380728519-IMG_9235-2.jpg',
    keys: ['cocada', 'cocada de forno'],
  },
  {
    name: 'Feijão-carioca com cominho',
    image: 'https://cdn.panelinha.com.br/receita/1489425336617-301213.jpg',
    keys: ['feijão', 'feijão carioca', 'feijão carioca com cominho'],
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
    description:
      'Quibebe é um prato de origem africana, típico da culinária brasileira. É um purê de abóbora que acompanha, geralmente, carne, frango ou peixe.',
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
  },
  {
    name: 'Bisteca grelhada',
    image:
      'https://cdn.panelinha.com.br/receita/1468206000000-Bisteca-grelhada.jpg',
  },
  {
    name: 'Homus com cordeiro',
    image: 'https://cdn.panelinha.com.br/receita/1632776457017-homus.jpg',

    keys: ['humus com cordeiro', 'homus com cordeiro'],
  },
  {
    name: 'Homus',
    image:
      'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2019/03/homus-1024x768.jpg',

    keys: ['homus', 'hômus', 'humus', 'pasta de grão de bico'],
  },
  {
    name: 'Pasta de alho',
    image:
      'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2019/08/pasta-de-alho-caseira.jpg',

    keys: ['pasta de alho'],
  },
  {
    name: 'Frango na panela de pressão',
    image:
      'https://www.receiteria.com.br/wp-content/uploads/frango-facil-naa-de-pressao.png',
    keys: [
      'frango na panela',
      'frango na panela de pressão',
      'molho de frango',
      'molho de frango com tomate',
    ],
  },
];
