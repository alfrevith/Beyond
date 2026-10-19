window.Avanzo = window.Avanzo || {};
/* Each guide follows the same topic name as its questions. */
window.Avanzo.mathGuides = {
  'Conjuntos y operaciones': {
    idea: 'Los naturales, enteros y racionales están contenidos en los reales. Un racional puede escribirse como fracción de enteros; un irracional, como √2, no. El valor absoluto mide distancia al cero.',
    rule: 'Orden de operaciones: paréntesis → potencias y raíces → multiplicación y división → suma y resta. En cada nivel, avanza de izquierda a derecha.',
    example: 'En −8 + 3 × 4, primero calcula 3 × 4 = 12. Después suma −8 + 12 = 4.',
    tip: 'Distingue −3² = −9 de (−3)² = 9: los paréntesis cambian qué se eleva al cuadrado.'
  },
  'Fracciones': {
    idea: 'Una fracción representa partes de una unidad. Multiplicar o dividir numerador y denominador por el mismo número distinto de cero conserva su valor.',
    rule: 'Para sumar o restar, busca un denominador común. Para multiplicar, multiplica numeradores y denominadores. Para dividir, multiplica por el recíproco de la segunda fracción.',
    example: '2/3 + 5/6 = 4/6 + 5/6 = 9/6 = 3/2.',
    tip: 'No sumes los denominadores. Simplifica el resultado dividiendo ambos términos por su MCD.'
  },
  'Decimales y porcentajes': {
    idea: 'Un porcentaje expresa una cantidad de cada 100. El 12% equivale a 12/100 = 0.12.',
    rule: 'Parte = total × porcentaje/100. Cambio porcentual = (valor final − valor inicial) ÷ valor inicial × 100%.',
    example: 'Un descuento del 25% sobre $80 es 0.25 × 80 = $20. El precio final es $60.',
    tip: 'En un aumento o descuento, identifica primero la cantidad original sobre la que se calcula el porcentaje.'
  },
  'Proporciones': {
    idea: 'En una proporción directa, al multiplicar una cantidad por un factor, la otra se multiplica por el mismo factor. En una inversa, una aumenta mientras la otra disminuye en la misma proporción.',
    rule: 'Directa: y/x es constante. Inversa: x × y es constante.',
    example: 'Si 6 personas terminan un trabajo en 8 días, 12 personas al mismo ritmo tardan (6 × 8)/12 = 4 días.',
    tip: 'Antes de aplicar una regla de tres, decide si la relación es directa o inversa.'
  },
  'Razones': {
    idea: 'Una razón compara dos cantidades mediante una división. Una razón de 2:3 representa dos partes de una cantidad por tres de la otra.',
    rule: 'Para repartir un total según una razón a:b, divide el total entre a + b y multiplica por las partes de cada grupo.',
    example: 'En 30 estudiantes con razón niñas:niños de 2:3 hay 5 partes. Cada parte vale 6; hay 2 × 6 = 12 niñas.',
    tip: 'Respeta el orden de la comparación y las unidades. Distancia ÷ tiempo produce velocidad.'
  },
  'MCM y MCD': {
    idea: 'El MCD es el mayor divisor compartido. El MCM es el menor múltiplo positivo compartido.',
    rule: 'Factoriza en primos. Para el MCD toma los factores comunes con menor exponente; para el MCM, todos los factores con mayor exponente.',
    example: '12 = 2² × 3 y 18 = 2 × 3². MCD = 6; MCM = 36.',
    tip: 'Para formar el máximo número de paquetes idénticos, usa MCD. Para buscar cuándo coinciden ciclos, usa MCM.'
  },
  'Potencias y radicales': {
    idea: 'Una potencia representa multiplicaciones repetidas. Una raíz deshace una potencia: √a es el número no negativo cuyo cuadrado es a.',
    rule: 'aᵐ × aⁿ = aᵐ⁺ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁻ⁿ = 1/aⁿ si a ≠ 0.',
    example: '√72 = √(36 × 2) = 6√2.',
    tip: 'Las reglas de suma de exponentes se aplican a multiplicaciones de igual base, no a sumas de potencias.'
  },
  'Evaluación algebraica': {
    idea: 'Evaluar una expresión consiste en sustituir cada variable por el valor indicado y realizar las operaciones.',
    rule: 'Escribe los números negativos entre paréntesis antes de aplicar potencias o multiplicaciones.',
    example: 'Si x = −2, entonces 3x² − 4x = 3(−2)² − 4(−2) = 12 + 8 = 20.',
    tip: 'Una letra junto a un número indica multiplicación: 3x es 3 × x.'
  },
  'Igualdades y ecuaciones': {
    idea: 'Una ecuación es una igualdad con una incógnita. Resolverla es encontrar los valores que hacen verdadera la igualdad.',
    rule: 'Realiza la misma operación en ambos miembros. Usa operaciones inversas para aislar la incógnita.',
    example: '5x − 7 = 18 → 5x = 25 → x = 5. Verifica: 5(5) − 7 = 18.',
    tip: 'Si hay paréntesis, distribuye sobre todos los términos: 3(x − 2) = 3x − 6.'
  },
  'Ecuaciones aplicadas': {
    idea: 'Convierte un problema verbal en una ecuación: define la incógnita, relaciona los datos, resuelve y comprueba el resultado en el contexto.',
    rule: 'Escribe qué representa x y conserva las unidades en la respuesta.',
    example: 'Un taxi cobra $3 más $2 por km. Si pagaste $17: 3 + 2x = 17; x = 7 km.',
    tip: 'Comprueba si la respuesta tiene sentido: una edad o una distancia no pueden ser negativas en estos problemas.'
  },
  'Representación algebraica': {
    idea: 'El lenguaje algebraico convierte relaciones en expresiones. El doble de x es 2x; dos enteros pares consecutivos son 2n y 2n + 2.',
    rule: 'Usa paréntesis cuando una operación afecte a una suma completa.',
    example: 'La mitad de la suma de a y b es (a + b)/2. Cinco menos el doble de x es 5 − 2x.',
    tip: 'Lee con cuidado el orden en las restas: “cinco menos x” y “x menos cinco” son expresiones diferentes.'
  },
  'Funciones y gráficas': {
    idea: 'Una función asigna a cada entrada de su dominio una sola salida. Un punto (x, y) pertenece a su gráfica si y = f(x).',
    rule: 'En y = mx + b, m es la pendiente y b es la intersección con el eje y. Para hallar esa intersección, sustituye x = 0.',
    example: 'En y = 2x + 1, cuando x = 2 resulta y = 5: el punto (2, 5) pertenece a la recta.',
    tip: 'Una pendiente negativa indica que y disminuye cuando x aumenta. Una parábola como y = x² no es una recta.'
  },
  'Dominio': {
    idea: 'El dominio reúne las entradas para las que la expresión está definida en los números reales.',
    rule: 'Los denominadores deben ser distintos de cero y el interior de una raíz cuadrada debe ser mayor o igual que cero.',
    example: 'Para √(x + 1)/(x − 3), exige x ≥ −1 y además x ≠ 3. Se cumplen ambas condiciones a la vez.',
    tip: 'Busca todas las restricciones. En 1/(x² − 16) debes excluir tanto 4 como −4.'
  },
  'Ecuaciones con radicales': {
    idea: 'Aísla el radical antes de elevar ambos miembros al cuadrado. Este paso puede introducir soluciones que no cumplían la ecuación original.',
    rule: 'Establece las restricciones, elimina la raíz, resuelve y verifica cada candidato en la ecuación inicial.',
    example: '√(x + 5) = 4 → x + 5 = 16 → x = 11. Comprobación: √16 = 4.',
    tip: 'La raíz cuadrada principal no es negativa. En √x = x − 2, también debes exigir x − 2 ≥ 0.'
  },
  'Productos notables': {
    idea: 'Son multiplicaciones algebraicas frecuentes que puedes desarrollar con identidades. También sirven para reconocer factorizaciones.',
    rule: '(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; (a + b)(a − b) = a² − b².',
    example: '(x + 4)² = x² + 8x + 16; x² + 6x + 9 = (x + 3)².',
    tip: 'No omitas el término central: (a + b)² no es igual a a² + b².'
  },
  'Tendencia central': {
    idea: 'La media es el promedio; la mediana es el valor central de los datos ordenados; la moda es el valor más frecuente.',
    rule: 'Media = suma de los datos ÷ cantidad de datos. Si hay un número par de datos, la mediana es el promedio de los dos centrales.',
    example: 'Para 2, 4, 6, 10: media = 22/4 = 5.5 y mediana = (4 + 6)/2 = 5.',
    tip: 'Ordena antes de buscar la mediana. Puede haber varias modas si comparten la frecuencia máxima.'
  },
  'Gráficos e interpretación': {
    idea: 'Lee el título, los ejes, las unidades y la escala antes de comparar valores en una tabla o un gráfico.',
    rule: 'Cambio absoluto = final − inicial. En un gráfico circular, ángulo = proporción × 360°. Media con frecuencias = Σ(valor × frecuencia) ÷ Σfrecuencias.',
    example: 'Si transporte ocupa 25% de un círculo, su ángulo es 0.25 × 360° = 90°.',
    tip: 'Distingue un cambio de 15 unidades de un aumento del 15%: no expresan lo mismo.'
  },
  'Probabilidad': {
    idea: 'La probabilidad mide qué tan posible es un resultado. Va de 0 (imposible) a 1 (seguro).',
    rule: 'Con resultados igualmente probables: P = casos favorables ÷ casos posibles. Para dos sucesos consecutivos: P(A y B) = P(A) × P(B dado A).',
    example: 'Con 3 verdes y 2 amarillas, sin reposición: P(dos verdes) = (3/5) × (2/4) = 3/10.',
    tip: 'Sin reposición cambia el total disponible y puede cambiar el número de casos favorables en la segunda extracción.'
  },
  'Ángulos y figuras': {
    idea: 'Los ángulos complementarios suman 90° y los suplementarios, 180°. Los ángulos interiores de un triángulo suman 180°.',
    rule: 'Triángulo equilátero: tres lados iguales. Isósceles: al menos dos iguales. Escaleno: todos diferentes. Un paralelogramo tiene sus lados opuestos paralelos.',
    example: 'En un triángulo con ángulos de 40° y 65°, el tercero es 180° − 40° − 65° = 75°.',
    tip: 'No atribuyas a todos los paralelogramos las propiedades particulares de cuadrados o rectángulos.'
  },
  'Pitágoras': {
    idea: 'En un triángulo rectángulo, el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos. La hipotenusa está frente al ángulo recto.',
    rule: 'c² = a² + b². Para un cateto: a = √(c² − b²).',
    example: 'Con catetos de 6 y 8: c = √(36 + 64) = √100 = 10.',
    tip: 'Aplica este teorema a triángulos rectángulos. La hipotenusa siempre es el lado más largo.'
  },
  'Áreas, perímetros y círculos': {
    idea: 'El perímetro mide el contorno y se expresa en unidades de longitud. El área mide la superficie y usa unidades cuadradas.',
    rule: 'Rectángulo: A = base × altura, P = 2(base + altura). Triángulo: A = base × altura/2. Círculo: A = πr², C = 2πr = πd.',
    example: 'Una corona con radios 5 y 3 tiene área π(5² − 3²) = 16π unidades cuadradas.',
    tip: 'No confundas radio y diámetro: d = 2r. La altura de un triángulo es perpendicular a su base.'
  },
  'Patrones geométricos': {
    idea: 'Busca qué cambia entre una figura y la siguiente: cantidad, giro, posición o alternancia. Comprueba la regla en todos los pasos.',
    rule: 'En una fila de triángulos donde cada nuevo triángulo comparte un lado con el anterior: palitos = 3 + 2(n − 1).',
    example: '1, 4, 9, 16 son cuadrados: 1², 2², 3², 4². El siguiente es 5² = 25.',
    tip: 'No cuentes dos veces los lados compartidos. Una secuencia corta puede admitir varias reglas; busca la consistente con las opciones.'
  }
};
