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
];

export const recipes = recipesData.map((recipeData) =>
  RecipeService.format({ foods, recipeData }),
);
