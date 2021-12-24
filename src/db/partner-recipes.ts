import { RecipeData, RecipeService } from '../services/recipe';
import { foods } from './food';

export const recipesData: Array<RecipeData> = [
  {
    id: 1,
    name: 'Salada de macarrão com beringela e purê de beterraba (Panelinha)',
    category: 'salada',
    description:
      'Ideal pra quem não tem onde esquentar a marmita, essa salada é completa: aquela fominha logo às duas da tarde não vai aparecer! O purê de beterraba, com iogurte e zatar, funciona como molho e a berinjela assada dá um toque tostado.',
    steps: [
      {
        ingredients: `\
1 ⅓ de xícara (chá) de gravatinha (ou outra massa curta de grano duro)
1 berinjela
3 beterrabas pequenas
1 pote de iogurte natural (170 g)
¼ de xícara (chá) de nozes
4 ramos de salsinha
1 colher (chá) de zatar
azeite a gosto
sal a gosto`,
        name: '',
        preparation: `\
1. Preaqueça o forno a 200 ºC (temperatura média). Separe uma assadeira grande.

2. Mantenha a casca e, com uma escovinha para legumes, lave bem as beterrabas e a berinjela sob água corrente. Descarte os talos e corte as beterrabas ao meio. Corte a berinjela ao meio, no sentido do comprimento.

3. Numa assadeira grande, distribua as beterrabas com o lado cortado para baixo e as duas metades de berinjela com o lado cortado para cima. Regue a berinjela com um fio de azeite e tempere com sal. Leve ao forno e deixe assar por cerca de 15 minutos - teste com um garfo para verificar, a berinjela deve estar macia e as beterrabas cozidas, mas ainda firmes. Enquanto isso, prepare os outros ingredientes.

4. Leve ao fogo alto uma panela média com água. Assim que ferver, adicione 1 colher (chá) de sal e o macarrão. Misture e deixe cozinhar. Desligue o fogo 1 minuto antes do tempo indicado na embalagem - esse é o ponto ideal para usar o macarrão em saladas.

5. Assim que estiver cozido, escorra bem a água e transfira o macarrão para uma tigela. Regue com um fio de azeite, misture e deixe esfriar -3 o azeite evita que o macarrão grude um no outro ao esfriar.

6. Lave, seque e destaque as folhas de salsinha do talo. Pique as nozes grosseiramente. Reserve.

7. Assim que estiverem assados, retire os legumes do forno. Corte a berinjela em cubos médios de cerca de 2 cm x 2 cm e reserve. Corte a beterraba em pedaços menores e transfira para o copo do liquidificador. Junte o iogurte, o zatar, 1 colher (sopa) de azeite e 1 colher (chá) de sal. Bata bem até formar um purê (se preferir, bata no processador).

8. Separe 2 potes de vidro altos e monte a salada em camadas na seguinte ordem: primeiro o purê de beterraba, em seguida o macarrão cozido, a berinjela em cubos, as folhas de salsinha e as nozes picadas. Feche o pote e mantenha na geladeira. Na hora de consumir, chacoalhe para misturar o molho ou vire num prato.`,
        additional: '',
      },
    ],
  },
  {
    id: 2,
    category: 'sobremesa',
    name: 'Arroz doce, caramelizado com farofa',
    steps: [
      {
        name: 'arroz doce',
        ingredients: `\
1 xícara de Arroz Branco Premium Fritz & Frida lavado e escorrido
1 xícara de açúcar (para o caramelo)
3 xícaras de leite semidesnatado
1 Canela em Casca Fritz & Frida
4 Cravos da Índia Fritz & Frida
1 caixinha de creme de leite
Canela Moída Fritz & Frida a gosto
2 xícaras de açúcar`,
        preparation: `\
1. Em uma panela, cozinhe o arroz em 1/2 litro de água, até ficar "al dente". Retire do fogo, escorra a água e reserve.

2. Coloque em uma panela o açúcar para o caramelo e leve ao fogo até caramelizar. Despeje com cuidado o leite e misture. Acrescente o arroz, o restante do açúcar, a canela em casca e os cravos. Abaixe o fogo e cozinhe, mexendo de vez em quando, por 15 minutos ou até a calda encorpar. Se necessário, vá acrescentando mais leite à mistura.

3. Misture o creme de leite. Ao ferver, retire do fogo, distribua o doce em tacinhas ou tigelas, polvilhe a canela moída e decore com canela em casca e a farofa doce de amendoim. Sirva quente ou gelado.`,
        additional: '',
      },
      {
        name: 'farofa doce',
        ingredients: `\
3 xícaras de Amendoim Cru Sem Casca Fritz & Frida
4 colheres (sopa) de açúcar
2 colheres (chá) de Bicarbonato de Sódio Fritz & Frida`,
        preparation: `\
1. Lave o amendoim e escorra. Coloque em uma panela o açúcar e os amendoins, e leve ao fogo, misturando delicadamente. Quando o açúcar começar a ficar com um tom dourado, acrescente o bicarbonato.

2. Retire do fogo e despeje em um tabuleiro untado. Após endurecer, triture com um martelo de bater bife ou processador de alimentos até atingir o ponto de farofa rústica.

3. Sirva a farofa sobre o arroz doce.`,
        additional: '',
      },
    ],
  },
  {
    category: 'aperitivo',
    name: 'Rodelas de abobrinha crocantes com parmesão',
    steps: [
      {
        ingredients: `\
2 abobrinhas
⅔ de xícara (chá) de farinha panko
⅓ de xícara (chá) de queijo parmesão ralado fino
azeite a gosto
¼ de colher (chá) de páprica doce
sal e pimenta-do-reino moída na hora a gosto`,
        name: 'abobrinha',
        preparation: `\
Preaqueça o forno a 220 ºC (temperatura alta). Unte uma assadeira grande com 1 colher (sopa) de azeite (caso as rodelas de abobrinha não caibam numa só assadeira, utilize 2 ou prepare a receita em duas levas).

Numa travessa média, misture a farinha panko com o queijo parmesão e a páprica. Tempere com sal e pimenta a gosto. Reserve.

Lave a casca das abobrinhas sob água corrente e seque bem – quanto mais sequinhas estiverem, melhor para empanar. Corte e descarte as pontas das abobrinhas e fatie cada uma em rodelas de 1 cm de espessura.

Transfira as abobrinhas cortadas para uma tigela grande, adicione 1 ½ colher (sopa) de azeite e misture bem com as mãos para envolver todas as rodelas com o azeite.

Para empanar as abobrinhas: coloque algumas rodelas de abobrinha na travessa com a farinha, uma ao lado da outra. Pressione com as mãos para grudar a farinha, vire e pressione novamente para cobrir toda a superfície.

Transfira as abobrinhas empanadas para a assadeira, deixando espaço entre cada uma — quanto mais espaço, mais douradas e crocantes ficam. Repita com o restante.

Leve ao forno para assar por cerca de 20 minutos, ou até ficarem bem douradas — na metade do tempo, vire os pedaços com uma espátula, delicadamente para não soltar a casquinha. Enquanto isso, prepare a tapenade.

Retire as abobrinhas do forno e sirva a seguir com a tapenade.`,
        additional:
          'OBS: se você não encontrar a farinha panko, pode usar farinha de rosca, de preferência caseira para dar mais textura crocante ao preparo.',
      },
      {
        ingredients: `\
½ xícara (chá) de azeitonas verdes sem caroço
2 colheres (sopa) de azeite
raspas de 1 limão
2 ramos de manjericão
1 pitada de sal`,
        name: 'tapenade',
        preparation:
          'No copo do mini-processador, coloque as azeitonas, o azeite, as raspas de limão e uma pitada de sal. Bata até triturar bem as azeitonas. Junte as folhas de manjericão e bata apenas para incorporar.',
        additional: '',
      },
    ],
    description:
      'Uma casquinha crocante e dourada envolve as rodelas de abobrinha, bem macias. A melhor parte: é sem fritura. Antes de sair correndo para já preaquecer o forno, um conselho: não deixe de preparar a tapenade para acompanhar!',
    id: 3,
  },
  {
    id: 4,
    name: 'Arroz carreteiro (Panelinha)',
    description:
      'Quem sabe das coisas já vai separando sobras durante o churrasco para o carreteiro do dia seguinte. A receita é uma fórmula: considere 1 xícara de sobras para 1 xícara de arroz. Pode usar a combinação de cortes que quiser: vale picanha, linguiça, maminha… Sirva com vinagrete e farofa.',
    category: 'comida',
    steps: [
      {
        ingredients: `\
1 xícara (chá) de sobras de carnes do churrasco picadas em cubos de 1 cm
1 xícara (chá) de arroz
½ cebola
2 dentes de alho
1 tomate
2 colheres (sopa) de azeite
1 folha de louro
5 ramos de salsinha
3 talos de cebolinha
½ colher (chá) de sal
pimenta-do-reino moída na hora a gosto
folhas de salsinha a gosto para servir`,
        name: 'Arroz',
        preparation: `\
Corte as carnes em cubos de 1 cm – caso o corte escolhido tenha uma camada grossa de gordura, descarte. Nessa receita, usamos picanha e linguiça, mas você pode fazer diferentes combinações com o que tiver sobrado o churrasco.

Descasque e pique fino a cebola e os dentes de alho. Lave, seque e corte os tomates em quartos; descarte as sementes e corte cada quarto em tiras e as tiras em cubos de 1 cm. Lave, seque e pique fino a salsinha e a cebolinha.

Numa chaleira, leve um pouco mais de 2 xícaras (chá) de água ao fogo baixo para ferver.

Leve uma panela média ao fogo médio para aquecer. Regue com 1 colher (sopa) de azeite, acrescente a cebola, tempere com uma pitada de sal e refogue por 4 minutos, até começar a dourar.

Adicione o tomate, tempere com uma pitada de sal e refogue por 2 minutos até murchar levemente – não é preciso desmanchar. Junte as carnes picadas, o alho e o louro, tempere com pimenta a gosto e mexa por 2 minutos para as carnes aquecerem e absorverem o sabor do refogado.

Regue com 1 colher (sopa) de azeite, adicione o arroz e mexa bem para envolver todos os grãos com o azeite por 1 minuto – isso ajuda a deixar o arroz soltinho depois de cozido.

Meça 2 xícaras (chá) da água fervente e regue o arroz. Tempere com ½ colher (chá) de sal, misture bem e não mexa mais. Enquanto isso, prepare a farofa.

Assim que a água atingir o mesmo nível do arroz, abaixe o fogo e tampe parcialmente a panela. Deixe cozinhar até que o arroz absorva toda a água – para verificar se a água secou, fure o arroz com um garfo e afaste delicadamente alguns grãos do fundo da panela; se ainda estiver molhado, deixe cozinhar mais um pouquinho.

Desligue o fogo e mantenha a panela tampada por 5 minutos antes de servir para que os grãos terminem de cozinhar no próprio vapor. Em seguida, solte os grãos com um garfo e misture a salsa e cebolinha picadas. Sirva a seguir com molho vinagrete, a farofa tostada e folhas de salsinha.`,
        additional: '',
      },
      {
        ingredients: `\
      1 xícara (chá) de farinha de mandioca torrada
25 g de manteiga
1 pimenta dedo-de-moça
sal a gosto`,
        name: 'Farofa tostada',
        preparation: `\
Lave, seque e corte a pimenta dedo-de-moça ao meio no sentido do comprimento, descarte as sementes e fatie fino cada metade. Dica: para evitar acidentes com dedos apimentados nos olhos, passe óleo ou azeite nas mãos depois de cortar as pimentas — a capsaicina, substância responsável pelo ardor, é lipossolúvel. Depois, lave as mãos com sabonete para tirar o óleo.

Leve uma frigideira média com a manteiga ao fogo médio. Assim que derreter, junte a pimenta picada e mexa por 1 minuto para perfumar. Tempere com sal e acrescente a farinha aos poucos, misturando com a espátula. Mexa por mais 5 minutos, até a farofa ficar bem dourada e crocante.`,
        additional: '',
      },
    ],
  },
  {
    id: 5,
    name: 'Sopa de cenoura com curry',
    category: 'comida',
    description:
      'Nesta receita, o caldo de frango faz toda a diferença (e ainda sobra para outras preparacões). Junto com o leite de coco e o curry, deixa a cenoura com gosto renovado!',
    steps: [
      {
        name: 'caldo',
        ingredients: `\
1 peito de frango com osso e sem a pele
2 cenouras
1 cebola
2 talos de salsão (as folhas de 1)
2 litros de água
1 folha de louro
3 cravos-da-índia
5 grãos de pimenta-do-reino`,
        preparation: `\
Sob água corrente, lave bem as cenouras, o salsão e as folhas; numa tábua, corte os legumes ao meio. Descasque e corte ao meio a cebola; numa das metades, espete a folha de louro com os cravos.

Lave o peito de frango sob água corrente e retire o excesso de gordura.

Coloque todos os ingredientes numa panela e leve ao fogo alto. Quando ferver, diminua o fogo e deixe cozinhar por mais 40 minutos.

Com uma pinça, retire o peito de frango e reserve na geladeira para outra preparação. Transfira o caldo para uma tigela, passando por uma peneira. Reserve os legumes para o preparo da sopa. Reserve 1 xícara (chá) do caldo e transfira o restante para forminhas de gelo para congelar.`,
        additional: '',
      },
      {
        name: 'sopa',
        ingredients: `\
1 xícara (chá) do caldo de frango reservado
1 cenoura cozida (do caldo)
½ cebola cozida (do caldo)
1 colheres (sopa) de leite de coco
¼ de colher (chá) de curry
¼ de colher (chá) de sal`,
        preparation: `\
No copo do liquidificador coloque o caldo de frango, a cenoura cozida, a cebola e o leite de coco. Bata por cerca de 2 minutos, até formar um creme liso. Atenção: segure firme a tampa do liquidificador com um pano de prato para evitar que o vapor do caldo abra a tampa.

Tempere com o sal e o curry e bata apenas para misturar. Sirva a seguir ainda quente.`,
        additional:
          'OBS: se quiser levar de marmita para o trabalho, transfira a sopa para uma garrafa de vidro com tampa e mantenha na geladeira até a hora de servir. Esquente no micro-ondas ou sirva fria - fica deliciosa!',
      },
    ],
  },
  {
    id: 6,
    category: 'comida',
    name: 'Cuscuz marroquino com filé mignon suíno',
    description:
      'Este prato é ótimo para servir no verão e um bom jeito de comer carne fria. O molho de geleia caseira garante um sabor agridoce ao preparo e as ervas frescas fazem a vez da salada.',
    steps: [
      {
        name: '',
        ingredients: `\
1 peça de filé mignon suíno (cerca de 650 g)
1 ½ xícara (chá) de cuscuz marroquino
1 xícara (chá) de ervilha congelada
¼ de xícara (chá) de geleia de manga e maracujá caseira
⅓ de xícara (chá) de amendoim torrado sem casca e sem sal
½ cebola
azeite a gosto
1 pitada de açúcar
½ colher (chá) de gengibre em pó
sal e pimenta-do-reino moída na hora a gosto
1 maço de coentro lavado para servir
1 maço de salsinha lavado para servir`,
        preparation: `\
Preaqueça o forno a 180 ºC (temperatura média). Com a faca, retire e descarte a fáscia e qualquer excesso de gordura da peça de filé mignon suíno.

Na tábua, tempere o filé mignon com o gengibre em pó, sal e pimenta-do-reino. Regue com 1 colher (sopa) de azeite e esfregue com as mãos para temperar toda a superfície da carne.

Leve uma frigideira grande ao fogo médio. Quando aquecer, regue com 1 colher (sopa) de azeite e acrescente o filé mignon. Deixe dourar, sem mexer, por cerca de 4 minutos e vire a carne com uma pinça para dourar toda a superfície por igual. Desligue o fogo e transfira o filé mignon para uma assadeira untada com azeite.

Regue a peça com mais um fio de azeite e leve ao forno para terminar de assar por cerca de 40 minutos - o filé mignon suíno deve ser servido ao ponto, espete com uma faquinha e verifique: se o líquido ainda sair com sangue deixe assar por mais alguns minutos.

Enquanto isso, descasque e pique bem fino a cebola. Volte a frigideira ao fogo médio (não precisa lavar, o queimadinho da carne da sabor à receita), regue com mais um fio de azeite e acrescente a cebola. Tempere com uma pitada de sal e de açúcar e refogue por cerca de 10 minutos até ficar bem dourada. Regue com ⅓ de xícara (chá) de água e raspe bem o fundo da frigideira com a espátula para dissolver todo o queimadinho. Misture bem a geleia e tempere com sal e pimenta-do-reino a gosto - se quiser um molho mais fluido acrescente água aos poucos. Transfira para uma molheira e reserve.

Numa tigela grande, coloque o cuscuz marroquino, as ervilhas e tempere com 1 colher (chá) de sal e 2 colheres (sopa) de azeite. Regue com 1 ½ xícara (chá) de água fervente e misture bem; tampe e deixe abafado por 5 minutos para hidratar. Solte o cuscuz com um garfo e reserve.

Assim que estiver assado, retire do forno e transfira o filé mignon suíno para a tábua. Corte em cubos de cerca de 1,5 cm e misture ao cuscuz marroquino. Regue com o molho de maracujá, junte o amendoim e misture bem. Sirva a seguir com folhas de salsinha e coentro. Se preferir deixe na geladeira e sirva frio.`,
        additional:
          'OBS: para montar as marmitas, coloque o cuscuz marroquino em potes de vidro e cubra com as folhas de salsinha e coentro. Feche e mantenha na geladeira até a hora de servir.',
      },
    ],
  },
  {
    id: 7,
    name: 'Geleia de manga e maracujá',
    description:
      'Tem fruta madura dando sopa? Geleia nelas! E geleia caseira, claro, sem conservantes e com aquele gostinho de cozinha do interior. Nesta receita, o maracujá (azedo, de sabor mais forte e rico em pectina) é combinado com a manga (mais doce e carnuda).',
    category: 'sobremesa',
    steps: [
      {
        name: '',
        ingredients: `\
    2 mangas maduras
3 maracujás
1 xícara (chá) de açúcar demerara
⅔ de xícara (chá) de água`,
        preparation: `\
Coloque um pires no congelador - ele vai ser utilizado para verificar o ponto do cozimento da geleia.

Descasque e corte a polpa da manga em pedaços médios. Transfira para uma panela média, cubra com água e deixe cozinhar em fogo baixo por cerca de 15 minutos, mexendo de vez em quando e amassando com a espátula para formar um purê.

Corte o topo dos maracujás e junte a polpa (com as sementes) ao purê de manga. Acrescente o açúcar e misture bem. Deixe cozinhar em fogo baixo por mais 25 minutos, até engrossar, mexendo de vez em quando para não grudar no fundo e laterais da panela. Para verificar o ponto coloque um pouco da geleia num dos cantos do pires e incline delicadamente: a geleia deve estar na consistência de gel, ela não pode escorrer líquida.

Com uma concha, transfira a geleia ainda quente para potes de vidro esterilizados, deixando cerca de 2 cm até a tampa livre. Feche os potes com a geleia quente para formar vácuo.`,
        additional:
          'Você pode conservar a geleia pronta por até 2 meses, fechada a vácuo, em temperatura ambiente; por até 6 meses no congelador e após aberta por 1 mês na geladeira.',
      },
    ],
  },
  {
    id: 8,
    name: 'Vinagrete de chuchu com cominho',
    description:
      'Bem crocante e cortado em cubinhos bem pequenos, o chuchu surpreende nesse vinagrete. Ele absorve o sabor do cominho e rende um molho incrível para usar no sanduíche, colocar no pastel, servir com tortas.',
    category: 'salada',
    steps: [
      {
        name: '',
        ingredients: `\
1 chuchu grande
½ cebola roxa
caldo de 1 limão
2 colheres (sopa) de vinagre de vinho tinto
½ colher (chá) de semente de cominho
3 colheres (sopa) de azeite
sal a gosto
cubos de gelo`,
        preparation: `\
Descasque e corte a cebola em cubos pequenos, de 0,5 cm. Transfira para uma tigela pequena, adicione ½ colher (sopa) do vinagre, os cubos de gelo e cubra com água. Mantenha a cebola imersa por pelo menos 10 minutos para perder o ardido. Enquanto isso, prepare os outros ingredientes.

Descasque, lave sob água corrente e seque bem o chuchu com um pano de prato limpo – assim ele não escorrega na hora de cortar. Corte o chuchu ao meio, no sentido da largura, para separar a parte mais fina da mais grossa. Corte as metades em fatias de 0,5 cm, as fatias em tiras de 0,5 cm e as tiras em cubos. Transfira o chuchu cortado para uma tigela.

No pilão, quebre as sementes de cominho e junte ao chuchu.

Escorra a cebola e adicione ao chuchu. Tempere com o azeite, o caldo de limão, o restante do vinagre e sal a gosto. Misture bem e sirva a seguir ou mantenha na geladeira até a hora de servir – o vinagrete fica ainda mais gostoso depois de curtir na geladeira por 30 minutos.`,
        additional:
          'OBS: não precisa tirar o miolo do chuchu. Caso tenha vindo com a semente, retire com uma colher e descarte.',
      },
    ],
  },
  {
    id: 9,
    name: 'Brownie cremoso de castanha-do-pará',
    description:
      'O mundo se divide entre pessoas que gostam de brownie fofo ou brownie denso-cremoso. Esta receita é para quem gosta da segunda opção. As castanhas dão crocância à sobremesa, que é servida com frutas e creme batido – um espetáculo.',
    category: 'sobremesa',
    steps: [
      {
        name: 'brownie',
        ingredients: `\
200 g de chocolate amargo (55% de cacau)
200 g de manteiga
3 ovos
1 xícara (chá) de açúcar
⅔ de xícara (chá) de farinha de trigo
1 pitada de sal
½ xícara (chá) de castanha-do-pará`,
        preparation: `\
Preaqueça o forno a 180 °C (temperatura média). Unte com manteiga uma assadeira redonda de 24 cm de diâmetro com fundo removível. Corte um quadrado de papel-manteiga grande o suficiente para cobrir o fundo. Coloque o aro em cima e feche. Dobre a sobra de papel para baixo da fôrma - este método evita que massas mais líquidas escorram pelo encaixe. Corte uma tira para forrar a parede da fôrma (cerca de 80 cm X 8 cm).

Leve uma panela média com água ao fogo médio - ela vai ser usada para fazer o banho-maria.

Pique o chocolate em pedaços pequenos e corte a manteiga em cubos. Transfira para uma tigela grande de vidro refratário e encaixe sobre a panela com água quente. Mexa com uma espátula até derreter. Retire a tigela da panela e deixe amornar enquanto separa os outros ingredientes - se o chocolate estiver muito quente pode cozinhar os ovos.

Quebre um ovo de cada vez numa tigela pequena - para verificar se estão bons - e transfira para outra tigela. Bata com um garfo apenas para misturar as claras com as gemas. Pique grosseiramente as castanhas.

Com a espátula, misture o açúcar e uma pitada de sal com o chocolate derretido. Acrescente os ovos e misture bem para incorporar. Junte a farinha aos poucos, mexendo bem. Por último, misture as castanhas picadas.

Transfira a massa do brownie para a fôrma preparada e nivele a superfície com a espátula. Leve ao forno para assar por cerca de 20 minutos. Atenção para o ponto: o brownie deve criar uma casquinha na superfície e manter o miolo cremoso - espete com um palito para verificar.

Retire do forno e deixe amornar. Leve para a geladeira para firmar por pelo menos 1 hora antes de desenformar e servir.`,
        additional: '',
      },
      {
        name: 'para servir',
        ingredients: `\
1 carambola
7 morangos
1 kiwi
1 manga
1 mexerica
açúcar de confeiteiro para polvilhar a gosto
hortelã a gosto
creme de leite fresco batido (opcional)`,
        preparation: `\
Lave, seque e corte a carambola em fatias para formar estrelas. Lave, deixe escorrer bem a água e corte os morangos ao meio, no sentido do comprimento.

Descasque e corte o kiwi ao meio, no sentido do comprimento. Corte cada metade em gomos. Descasque e corte a manga em cubos médios. Descasque, descarte as fibras e separe os gomos da mexerica.

Desenforme o brownie e descarte o papel da lateral. Cubra com um prato e vire de uma só vez. Retire delicadamente a base da fôrma e o papel manteiga do fundo do brownie. Desvire sobre o prato de servir e polvilhe com açúcar de confeiteiro a gosto. Sirva com as frutas picadas, folhas de hortelã e creme de leite fresco batido.`,
        additional: '',
      },
    ],
  },
  {
    id: 10,
    name: 'Filé de frango grelhado com páprica e erva-doce',
    description:
      'Para não ressecar, o frango toma um banho de banheira num soro mágico, que além da suculência, também garante um sabor diferente, graças à páprica e à erva-doce. Frango grelhado seco e sem graça, nunca mais!',
    category: 'comida',
    steps: [
      {
        name: '',
        ingredients: `\
2 filés de peito de frango (cerca de 200g cada)
1 colher (chá) de sementes de erva-doce
2 colheres (chá) de páprica doce
1 colher (sopa) de sal
1 colher (chá) de açúcar
1 dente de alho
1 colher (chá) de azeite
sal e pimenta-do-reino moída na hora a gosto`,
        preparation: `\
Com a lateral da faca, amasse e descasque o dente de alho – não precisa picar, o alho vai perfumar o soro e depois ser descartado. Num pilão, bata as sementes de erva-doce apenas para quebrá-las.

Numa tigela média, coloque os filés de frango e acrescente o alho, a erva-doce, a páprica, o sal e o açúcar. Esfregue bem as especiarias no filé de frango para cobrir toda a superfície e cubra com água (cerca de 3 xícaras (chá) são suficientes para deixar os filés imersos). Tampe com um prato e deixe hidratar por 20 minutos na geladeira.

Retire os frangos da geladeira e mantenha em temperatura ambiente por pelo menos 10 minutos antes de grelhar. Atenção: a carne não pode estar gelada na hora de ir para a frigideira. Lave em água corrente para tirar o excesso de sal e seque bem os filés com papel-toalha.

Leve uma frigideira média antiaderente ao fogo médio e tempere os filés de frango com pimenta-do-reino a gosto. Quando aquecer, regue a frigideira com o azeite e coloque os filés com o lado mais liso para baixo – assim, o frango não sai da frigideira com um aspecto achatado. Deixe dourar por 2 minutos de cada lado e abaixe o fogo – esse processo vai selar a carne e manter o filé suculento.

Deixe os filés de frango terminarem de cozinhar em fogo baixo por mais 3 minutos de cada lado. O tempo pode variar dependendo do tamanho e espessura do filé. Atenção: o fogo tem que estar baixo, do contrário, a carne queima por fora e fica crua por dentro. Sirva a seguir.`,
        additional:
          'Caso esteja utilizando um cooktop por indução, selecione a potência 12 para selar os filés, depois diminua para a potência 6.',
      },
    ],
  },
  {
    id: 11,
    name: 'Clotted cream caseiro',
    description:
      'Produto típico inglês, parece uma variação do requeijão e é servido tradicionalmente com scones e geleia. Esta é uma versão prática, feita no micro-ondas. Mas para ficar no ponto precisa descansar na geladeira de um dia para o outro.',
    category: 'aperitivo',
    steps: [
      {
        name: '',
        ingredients: '500 ml de creme de leite fresco 35% de gordura',
        preparation: `\
Coloque o creme de leite num refratário quadrado de 22 cm, ou outro recipiente que possa ir ao micro-ondas e que seja largo o suficiente para que o creme fique com uma altura de cerca de 2,5 cm de altura  (marinex de vidro quadrado 22 cm, capacidade 3 litros). É importante utilizar um refratário mesmo, de base larga, e não uma tigela, para que o creme tenha uma superfície maior e assim a água possa evaporar mais rápido e o creme coagular de maneira uniforme.

Leve o refratário ao micro-ondas e cubra com uma tampa específica para o eletrodoméstico – é importante cobrir com a tampa furadinha pois o creme espirra e gera bastante vapor durante o cozimento.

Cozinhe o creme em potência alta, em 3 etapas de 5 minutos. A cada etapa retire o refratário com cuidado para não se queimar, utilizando um pano de prato, e verifique a consistência do creme (alguns micro-ondas são mais potentes que outros, o tempo final após essas 3 etapas pode variar):

Após 5 minutos
Existe um vapor inicial e o creme começa a formar uma espuma e pequenas bolhas na superfície.

Após 10 minutos
Cuidado para não se queimar, o refratário está bem quente e há bastante vapor quente. A nata de cima fica mais grossa, o creme ferve mais e começa a espirrar na tampa.

Após 15 minutos
É possível notar um cheiro de queijo no ar, a nata da superfície fica mais espessa mas o fundo ainda está líquido. Incline levemente o refratário, é como se houvesse duas camadas: uma nata mais grossa na superfície e debaixo dela o creme mais líquido.

Após os 15 minutos de cozimento, volte o refratário para rodar no micro-ondas por 2 etapas de 1 minuto cada, até atingir a consistência final desejada: a superfície do creme estará levemente amarelada. Ao inclinar o refratário, o creme está mais encorpado e não há mais uma divisão tão clara (nata grossa e creme líquido).

Após a última etapa de cozimento, retire o refratário do micro-ondas e mantenha em temperatura ambiente até esfriar completamente, por cerca de 2 horas.

Cubra com filme e leve à geladeira para o creme esfriar e terminar de atingir a consistência, por pelo menos 12h (se preferir, prepare no dia anterior ao de servir).

Na hora de servir, retire da geladeira e, com uma colher, transfira o creme para uma tigela. Você vai notar que a superfície fica mais espessa e a base mais molinha. Misture delicadamente para servir. O clotted cream pode ser mantido na geladeira por até 3 dias. `,
        additional: '',
      },
    ],
  },
  {
    id: 12,
    name: 'Café de prensa',
    description:
      'Método favorito da Rita para preparar café, a prensa francesa é uma jarra com um êmbolo e um filtro. O pó precisa ser moído especialmente para ela – você pode comprar assim em cafeterias ou ter um moedor de uso exclusivo do café. O esforço compensa.',
    category: 'aperitivo',
    steps: [
      {
        name: '',
        ingredients: `\
6 colheres (sopa) de café moído para prensa francesa
300 ml de água filtrada`,
        preparation: `\
Escalde a jarra e descarte a água - isso ajuda a preservar a temperatura do café por mais tempo. Num fervedor, leve a água filtrada ao fogo médio para aquecer. Atenção: não deixe a água ferver, assim que começarem a subir as primeiras bolhinhas desligue o fogo – se a água estiver muito quente pode queimar o pó e deixar o café amargo em excesso.

Coloque os grãos moídos na jarra da prensa, despeje um poudo da água filtrada bem quente, apenas para cobrir o pó e deixe hidratar por alguns segundos.

Regue com um pouco mais da água, mexa o café com uma colher e apenas então despeje o restante da água. Misture bem e encaixe o êmbolo. Deixe em infusão por 3 a 4 minutos e só depois pressione para filtrar o café. Sirva a seguir.`,
        additional:
          'Se sua prensa tiver uma capacidade maior, use o dobro da quantidade de café e de água.',
      },
    ],
  },
  {
    id: 13,
    name: 'Torta de banana',
    description:
      'O açúcar mascavo dá um gostinho especial – mais complexo – a essa torta clássica e com gosto de comida-conforto. Uma pitada de canela faz dupla imbatível com a banana-nanica.',
    category: 'sobremesa',
    steps: [
      {
        name: 'Para a massa',
        ingredients: `\
1 ½ xícara (chá) de farinha de trigo
100 g de manteiga gelada em cubos
⅓ de xícara (chá) de açúcar
1 ovo
1 gema
½ colher (chá) de fermento em pó`,
        preparation: `\
Numa tigela grande, misture a farinha, o açúcar e o fermento em pó. Acrescente a manteiga em cubos e misture com as pontas dos dedos até formar uma farofa grossa.

Junte o ovo, a gema e amasse até formar uma massa lisa e bem macia. Modele uma bola e achate levemente para formar um disco – assim fica mais fácil na hora de abrir. Embale com filme e leve à geladeira para firmar por no mínimo 30 minutos para firmar (se preferir prepare no dia anterior). Enquanto isso, prepare o recheio de banana.`,
        additional: '',
      },
      {
        name: 'Para o recheio',
        ingredients: `\
6 bananas nanicas maduras
½ xícara (chá) de açúcar mascavo
1 colher (sopa) de amido de milho
½ colher (sopa) de manteiga
2 colheres (sopa) de água
1 pitada de canela em pó`,
        preparation: `\
Descasque e corte as bananas em rodelas de cerca de 1 cm. Numa tigela pequena, misture o amido com a água até dissolver, reserve.

Leve uma panela média com o açúcar ao fogo médio e deixe cozinhar por cerca de 5 minutos até derreter – mexa de vez em quando com uma espátula d silicone para derreter de maneira uniforme e não queimar. Assim que todo o açúcar derreter, adicione a manteiga e misture bem para incorporar.

Junte à panela as rodelas de banana, a canela e misture bem. Deixe cozinhar por cerca de 2 minutos, mexendo de vez em quando, até a banana começar a soltar o próprio caldo. Acrescente o amido dissolvido na água e mexa com a espátula por cerca de 5 minutos até o recheio engrossar e começar a soltar do fundo da panela – a consistência é de um doce de banana, não mexa demasiadamente para manter alguns pedaçaos de banana inteiros.

Transfira o recheio para uma tigela e mantenha em temperatura ambiente para amornar antes de rechear a torta – se ele estiver muito quente pode umedecer e cozinhar a massa.`,
        additional: '',
      },
      {
        name: 'Para a assar',
        ingredients: `\
1 ovo
1 colher (chá) de água
farinha de trigo para polvilhar a bancada`,
        preparation: `\
Preaqueça o forno a 200 ºC (temperatura média). Separe uma fôrma redonda canelada, com fundo removível, que tenha 22 cm de diâmetro de base e 24 cm de diâmentro de abertura. Retire a massa da geladeira – caso tenha preparado a massa no dia anterior, retire da geladeira 10 minutos antes de abrir para ficar mais fácil de abrir.

Com uma espátula (ou faca) corte a massa ao meio. Polvilhe a bancada com farinha de trigo e, com o rolo de macarrão, abra uma das metades da massa até formar um círculo 4 cm maior que a base da fôrma. Atenção: esta massa é bem delicada e pode rachar por conta do açucar, durante o processo polvilhe farinha sob e sobre a massa para evitar que grude na bancada ou no rolo.

Enrole a massa sobre o rolo e transfira para a fôrma. Com as pontas dos dedos, pressione delicadamente a massa para cobrir todo o fundo e lateral da fôrma. Passe o rolo sobre a borda da fôrma para cortar o excesso de massa – reserve as aparas para a decoração.

Com uma colher espalhe e nivele o recheio de banana, cobrindo todo o fundo da massa.

Polvilhe a bancada com mais um pouco de farinha e abra a outra metade da massa, seguindo as instruções do passo 2. Enrole a massa sobre o rolo e desenrole sobre a fôrma para cobrir o recheio. Pressione delicadamente a lateral da fôrma para selar a borda com a massa da cobertura. Com uma faca (ou carretilha) corte o excesso de massa.

Para a decoração: junte todas as aparas da massa e amasse para unir numa só porção. Polvilhe mais farinha sobre a bancada e abra a massa formando um retângulo. Com a faca (ou carretilha) corte 9 tiras de cerca de 1 cm de largura –  ideia é montar 3 tranças, quanto mais longas forem as tiras mais fácil de montar. Apoie 3 tiras na bancada, uma ao lado da outra e una as pontas – aperte a massa para firmar. Faça uma trança com as tiras e una as pontas, apertando a massa no final. Repita com as outras tiras para formar 3 tranças.

Numa tigela pequena, quebre o ovo e misture com a água. Com um pincel, espalhe a mistura na superfície da torta. Disponha as três tranças sobre a tampa da torta, formando um círculo rente a borda. Pincele a mistura de ovo e água também sobre as tranças.

Com a ponta de uma faquinha, faça 4 cortes em cruz no centro da torta – eles servem de saída para o vapor na hora de assar. Leve a torta ao forno para assar por cerca de 45 minutos, ou até ficar bem dourada. Retire do forno e deixe esfriar antes de desenformar para servir. `,
        additional:
          'OBS: a torta de banana também fica uma delícia servida quente com sorvete, creme batido ou pé de moleque com laranja.',
      },
    ],
    additional:
      'Para congelar: Depois de assada, deixe a torta esfriar completamente. Embale bem com filme, assim a torta não absorve a umidade do congelador, nem pega gosto de outras comidas, e leve ao freezer. Na hora de descongelar, preaqueça o forno a 180 ºC (temperatura média), desembale e transfira a torta para uma assadeira. Leve direto ao forno (ainda congelada), o tempo varia de forno para forno, o mais importante é verificar se o centro do recheio descongelou e está aquecido. A torta tem validade de 3 meses congelada.',
  },
  {
    name: 'Carne com batata e cenoura na panela de pressão',
    description:
      'Um ensopado bem caseiro, cheio de sabor e muito prático! É só preparar o refogado na própria panela elétrica de pressão, adicionar a carne (não precisa nem dourar) e programar a panela para cozinhar. Ao fim do cozimento, adicione os legumes e, depois de 5 minutos, tudo pronto: carne bem macia com batatas e cenouras cozidas, sem bagunça na cozinha nem medo da panela de pressão. É difícil de acreditar, mas você pode ver com seus próprios olhos na versão em vídeo da receita.',
    category: 'comida',
    steps: [
      {
        name: '',
        ingredients: `\
1 kg de acém
400 g de batata bolinha
2 cenouras
½ cebola
2 dentes de alho
1 colher (sopa) de extrato de tomate
2 colheres (sopa) de farinha de trigo
3 colheres (sopa) de vinagre de vinho tinto
1 xícara (chá) de água quente
azeite a gosto
2 folhas de louro
1 colher (chá) de cominho em pó
½ colher (chá) de colorau
¼ de colher (chá) de canela em pó
sal e pimenta-do-reino moída na hora a gosto
folhas de salsinha e cerefólio a gosto para servir
brotos de beterraba a gosto para servir`,
        preparation: `\
Corte o acém em cubos de cerca de 3 cm e transfira para uma tigela. Tempere com o cominho, o colorau, a canela, 1 colher (chá) de sal e pimenta-do-reino a gosto.

Descasque e pique fino a cebola e o alho.

Ligue a panela elétrica da linha Electrolux por Rita Lobo e programe para 30 minutos na função refogar.

Quando a panela aquecer, regue com 1 colher (sopa) de azeite, coloque a cebola, tempere com uma pitada de sal e refogue por 2 minutos, mexendo de vez em quando. Adicione o alho, o extrato de tomate, as folhas de louro e mexa por 1 minuto, até perfumar. Regue com 1 colher (sopa) de azeite, junte a farinha e mexa bem por mais 2 minutos.

Regue com o vinagre e a água. Tempere com mais 1 colher (chá) de sal, adicione a carne e misture delicadamente.

Feche a panela, ajuste a válvula para cozinhar na pressão e, na seleção manual, programe 30 minutos de cozimento em pressão alta. Enquanto isso, prepare os demais ingredientes.

Lave, seque e corte cada batatinha ao meio, no sentido do comprimento. Descasque e corte cada cenoura ao meio no sentido do comprimento. Corte cada metade em fatias de 1 cm na diagonal.

Passados os 30 minutos, desligue a panela e ajuste a válvula para liberar a pressão.

Abra a tampa, adicione as batatas e as cenouras. Feche a panela, ajuste a válvula para cozinhar na pressão, e, na seleção manual, programe 5 minutos de cozimento em pressão alta.

Após os 5 minutos, a panela vai desligar sozinha e manter o ensopado aquecido. Deixe o vapor sair completamente antes de abrir a tampa. Desligue a panela, sirva com salada de agrião, folhas de salsinha, cerefólio e brotos variados.`,
        additional: '',
      },
    ],
    additional: '',
  },
];

export const recipes = recipesData.map((recipeData) =>
  RecipeService.format({ foods, recipeData }),
);
