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
      },
      {
        ingredients: `\
½ xícara (chá) de azeitonas verdes sem caroço
2 colheres (sopa) de azeite
raspas de 1 limão
2 ramos de manjericão
1 pitada de sal`,
        name: 'tapenade',
        preparation: `\
No copo do mini-processador, coloque as azeitonas, o azeite, as raspas de limão e uma pitada de sal. Bata até triturar bem as azeitonas. Junte as folhas de manjericão e bata apenas para incorporar.`,
      },
    ],
    description:
      'Uma casquinha crocante e dourada envolve as rodelas de abobrinha, bem macias. A melhor parte: é sem fritura. Antes de sair correndo para já preaquecer o forno, um conselho: não deixe de preparar a tapenade para acompanhar!',
    id: 3,
  },
];

export const recipes = recipesData.map((recipeData) =>
  RecipeService.format({ foods, recipeData }),
);
