import type { Cliente, TipoIdentificacion } from '../types/clientes.types'

type MockRow = [
  string,             // nombre
  string,             // apellidos
  TipoIdentificacion, // tipoIdentificacion
  string,             // numeroIdentificacion
  string,             // direccion
  string,             // telefono
  string,             // correo
  string,             // recomendadoPor
  string,             // telefonoAdicional
  string,             // tipoTrabajo
  string,             // entidadTrabajo
  string,             // fuenteIngresos
  string,             // createdAt
]

const RAW: MockRow[] = [
  ['Carlos',    'Ramírez Torres',    'cedula',            '10245678',   'Cra 15 # 32-10, Bogotá',          '3101234567', 'carlos.ramirez@gmail.com',     'Pedro Suárez',     '6012345678', 'Empleado',     'Banco de Bogotá',          'Salario',          '2025-01-10'],
  ['Ana',       'Gómez Herrera',     'cedula',            '20345678',   'Calle 80 # 20-45, Medellín',       '3202345678', 'ana.gomez@hotmail.com',         'Luis Torres',      '',           'Independiente','Consultoría AG',           'Honorarios',       '2025-01-15'],
  ['Luis',      'Martínez Ríos',     'cedula',            '80456789',   'Av. 68 # 12-30, Bogotá',           '3003456789', 'luis.martinez@yahoo.com',       '',                 '3004567890', 'Empleado',     'Claro Colombia',           'Salario',          '2025-01-20'],
  ['María',     'López Castillo',    'cedula',            '52567890',   'Calle 45 # 10-20, Cali',           '3104567890', 'maria.lopez@gmail.com',         'Ana Gómez',        '',           'Comerciante',  'Almacén El Hogar',         'Ventas',           '2025-01-25'],
  ['Jorge',     'Pérez Vargas',      'cedula',            '91678901',   'Cra 7 # 50-15, Bucaramanga',       '3205678901', '',                              '',                 '',           'Empleado',     'Ecopetrol',                'Salario',          '2025-02-01'],
  ['Patricia',  'Sánchez Mora',      'cedula',            '43789012',   'Calle 100 # 15-40, Bogotá',        '3006789012', 'patricia.sanchez@gmail.com',    'Jorge Pérez',      '3007890123', 'Independiente','Estudio Jurídico PS',       'Honorarios',       '2025-02-05'],
  ['Roberto',   'Díaz Fuentes',      'cedula',            '71890123',   'Cra 30 # 25-55, Barranquilla',     '3107890123', 'roberto.diaz@outlook.com',      '',                 '',           'Empleado',     'Avianca',                  'Salario',          '2025-02-10'],
  ['Sandra',    'Morales Peña',      'cedula',            '39901234',   'Calle 22 # 8-30, Pereira',         '3208901234', 'sandra.morales@gmail.com',      'Patricia Sánchez', '3009012345', 'Comerciante',  'Distribuidora SM',         'Ventas',           '2025-02-15'],
  ['Diego',     'Jiménez Ruiz',      'cedula',            '79012345',   'Av. El Dorado # 90-15, Bogotá',    '3009012345', 'diego.jimenez@gmail.com',       '',                 '',           'Empleado',     'Ministerio de Educación',  'Salario',          '2025-02-20'],
  ['Claudia',   'Torres Mendoza',    'cedula',            '46123456',   'Cra 50 # 34-20, Medellín',         '3110123456', 'claudia.torres@hotmail.com',    'Roberto Díaz',     '3011234567', 'Independiente','Diseño y Moda CT',          'Honorarios',       '2025-02-25'],
  ['Andrés',    'Vargas Castro',     'cedula',            '80234567',   'Calle 13 # 22-10, Cali',           '3201234567', 'andres.vargas@gmail.com',       '',                 '',           'Empleado',     'Alpina Productos',         'Salario',          '2025-03-01'],
  ['Natalia',   'Herrera Salcedo',   'cedula',            '52345678',   'Cra 11 # 67-30, Bogotá',           '3002345678', 'natalia.herrera@gmail.com',     'Sandra Morales',   '',           'Empleado',     'Bancolombia',              'Salario',          '2025-03-05'],
  ['Felipe',    'Castro Bermúdez',   'cedula',            '79456789',   'Calle 56 # 14-25, Manizales',      '3113456789', '',                              '',                 '6064567890', 'Comerciante',  'Ferretería El Constructor', 'Ventas',          '2025-03-10'],
  ['Valentina', 'Ríos Ospina',       'cedula',            '1023567890', 'Av. 30 # 45-12, Bogotá',           '3014567890', 'valentina.rios@gmail.com',      'Andrés Vargas',    '',           'Estudiante',   'Universidad Nacional',     'Beca',             '2025-03-15'],
  ['Mauricio',  'Ospina Gutiérrez',  'cedula',            '80678901',   'Cra 45 # 19-08, Ibagué',           '3115678901', 'mauricio.ospina@yahoo.com',     '',                 '3016789012', 'Empleado',     'Ingenio Risaralda',        'Salario',          '2025-03-20'],
  ['Alejandra', 'Gutiérrez Pardo',   'cedula',            '52789012',   'Calle 72 # 20-30, Bogotá',         '3206789012', 'alejandra.gutierrez@gmail.com', 'Natalia Herrera',  '',           'Independiente','Agencia de Viajes AG',      'Comisiones',       '2025-03-25'],
  ['Camilo',    'Pardo Acosta',      'cedula',            '1025890123', 'Cra 9 # 12-40, Neiva',             '3107890124', 'camilo.pardo@hotmail.com',      '',                 '',           'Empleado',     'Gobernación del Huila',    'Salario',          '2025-04-01'],
  ['Isabela',   'Acosta Montoya',    'cedula',            '1026901234', 'Calle 15 # 88-20, Medellín',       '3008901235', 'isabela.acosta@gmail.com',      'Camilo Pardo',     '3009012346', 'Comerciante',  'Boutique IM',              'Ventas',           '2025-04-05'],
  ['Julián',    'Montoya Londoño',   'cedula',            '1027012345', 'Av. Américas # 36-10, Bogotá',     '3219012346', '',                              '',                 '',           'Empleado',     'EPM',                      'Salario',          '2025-04-10'],
  ['Daniela',   'Londoño Restrepo',  'cedula',            '1028123456', 'Cra 65 # 48-30, Medellín',         '3020123456', 'daniela.londono@gmail.com',     'Isabela Acosta',   '',           'Independiente','Consultoría DL',            'Honorarios',       '2025-04-15'],
  ['Sebastián', 'Restrepo Cardona',  'cedula',            '1029234567', 'Calle 40 # 7-25, Armenia',         '3121234567', 'sebastian.restrepo@outlook.com','',                 '3022345678', 'Empleado',     'Almacenes Éxito',          'Salario',          '2025-04-20'],
  ['Paola',     'Cardona Mejía',     'cedula',            '43345678',   'Cra 27 # 53-15, Bogotá',           '3212345678', 'paola.cardona@gmail.com',       'Daniela Londoño',  '',           'Empleado',     'Davivienda',               'Salario',          '2025-04-25'],
  ['Esteban',   'Mejía Arango',      'cedula',            '1030456789', 'Calle 11 # 29-40, Palmira',        '3003456789', 'esteban.mejia@gmail.com',       '',                 '',           'Comerciante',  'Distribuidora EA',         'Ventas',           '2025-05-01'],
  ['Mariana',   'Arango Escobar',    'cedula',            '1031567890', 'Av. 19 # 100-50, Bogotá',          '3114567890', 'mariana.arango@hotmail.com',    'Paola Cardona',    '3015678901', 'Independiente','Fotografía MA',             'Honorarios',       '2025-05-05'],
  ['Iván',      'Escobar Salazar',   'cedula',            '79678901',   'Cra 8 # 15-22, Popayán',           '3215678901', 'ivan.escobar@gmail.com',        '',                 '',           'Empleado',     'Hospital Universitario',   'Salario',          '2025-05-10'],
  ['Catalina',  'Salazar Quintero',  'cedula',            '52789013',   'Calle 63 # 17-35, Bogotá',         '3006789013', 'catalina.salazar@gmail.com',    'Mariana Arango',   '',           'Empleado',     'Avianca',                  'Salario',          '2025-05-15'],
  ['Nicolás',   'Quintero Valencia', 'cedula',            '1032890123', 'Cra 33 # 8-10, Cúcuta',            '3117890124', '',                              '',                 '3018901235', 'Comerciante',  'Comercial NQ',             'Ventas',           '2025-05-20'],
  ['Ángela',    'Valencia Rueda',    'cedula',            '46901234',   'Av. Boyacá # 72-15, Bogotá',       '3018901235', 'angela.valencia@gmail.com',     'Catalina Salazar', '',           'Independiente','Asesoría Contable AV',      'Honorarios',       '2025-05-25'],
  ['Tomás',     'Rueda Bejarano',    'cedula',            '1033012345', 'Calle 25 # 43-20, Villavicencio',  '3219012347', 'tomas.rueda@outlook.com',       '',                 '',           'Empleado',     'Llanos Petróleo',          'Salario',          '2025-06-01'],
  ['Lucía',     'Bejarano Nieto',    'cedula',            '1034123456', 'Cra 19 # 56-40, Bogotá',           '3020123457', 'lucia.bejarano@gmail.com',      'Ángela Valencia',  '3021234568', 'Estudiante',   'Universidad de los Andes', 'Beca',             '2025-06-05'],
  ['Rodrigo',   'Nieto Villamizar',  'cedula',            '80234568',   'Calle 50 # 30-15, Bucaramanga',    '3121234568', 'rodrigo.nieto@gmail.com',       '',                 '',           'Empleado',     'Sofasa',                   'Salario',          '2025-06-10'],
  ['Viviana',   'Villamizar Pachón', 'cedula',            '52345679',   'Av. NQS # 43-22, Bogotá',          '3212345679', 'viviana.villamizar@hotmail.com', 'Lucía Bejarano',  '',           'Comerciante',  'Moda Exclusiva VP',        'Ventas',           '2025-06-15'],
  ['Gustavo',   'Pachón Contreras',  'cedula',            '79456790',   'Cra 23 # 18-50, Tunja',            '3003456790', '',                              '',                 '3004567891', 'Empleado',     'Boyacá Gas',               'Salario',          '2025-06-20'],
  ['Diana',     'Contreras Bolaños', 'cedula',            '46567891',   'Calle 80 # 50-25, Bogotá',         '3114567891', 'diana.contreras@gmail.com',     'Viviana Villamizar','',          'Independiente','Marketing Digital DC',      'Honorarios',       '2025-06-25'],
  ['Hernán',    'Bolaños Duarte',    'cedula',            '80678902',   'Cra 1 # 14-30, Pasto',             '3215678902', 'hernan.bolanos@yahoo.com',      '',                 '',           'Empleado',     'Lotería del Nariño',       'Salario',          '2025-07-01'],
  ['Bibiana',   'Duarte Forero',     'cedula',            '52789014',   'Av. El Lago # 25-15, Bogotá',      '3006789014', 'bibiana.duarte@gmail.com',      'Diana Contreras',  '3007890125', 'Empleado',     'Compensar',                'Salario',          '2025-07-05'],
  ['Álvaro',    'Forero Castañeda',  'cedula',            '79890123',   'Calle 34 # 62-40, Ibagué',         '3117890125', 'alvaro.forero@gmail.com',       '',                 '',           'Comerciante',  'Agrocomercial FC',         'Ventas',           '2025-07-10'],
  ['Lina',      'Castañeda Rojas',   'cedula',            '1035901234', 'Cra 40 # 26-18, Medellín',         '3018901236', 'lina.castaneda@hotmail.com',    'Bibiana Duarte',   '',           'Independiente','Nutrición y Salud LCR',     'Honorarios',       '2025-07-15'],
  ['Óscar',     'Rojas Cabrera',     'cedula',            '80012346',   'Calle 17 # 9-55, Cali',            '3219012348', '',                              '',                 '3020123458', 'Empleado',     'Carvajal S.A.',            'Salario',          '2025-07-20'],
  ['Carolina',  'Cabrera Pinilla',   'cedula',            '46123457',   'Av. Suba # 115-30, Bogotá',        '3120123458', 'carolina.cabrera@gmail.com',    'Lina Castañeda',   '',           'Empleado',     'Scotiabank Colpatria',     'Salario',          '2025-07-25'],
  ['Jhon',      'Pinilla Bernal',    'cedula',            '1036234567', 'Cra 55 # 39-20, Bucaramanga',      '3001234568', 'jhon.pinilla@gmail.com',        '',                 '',           'Comerciante',  'Telecomunicaciones JP',    'Ventas',           '2025-08-01'],
  ['Yolanda',   'Bernal Aguilar',    'cedula',            '39345679',   'Calle 48 # 13-45, Bogotá',         '3112345679', 'yolanda.bernal@outlook.com',    'Carolina Cabrera', '3013456790', 'Independiente','Confecciones YBA',          'Ventas',           '2025-08-05'],
  ['Fabián',    'Aguilar Serrano',   'cedula',            '1037456789', 'Cra 14 # 85-12, Bogotá',           '3213456790', 'fabian.aguilar@gmail.com',      '',                 '',           'Empleado',     'SENA',                     'Salario',          '2025-08-10'],
  ['Eliana',    'Serrano Mendez',    'cedula',            '52567891',   'Calle 7 # 41-30, Armenia',         '3004567891', 'eliana.serrano@gmail.com',      'Fabián Aguilar',   '',           'Empleado',     'Banco Agrario',            'Salario',          '2025-08-15'],
  ['Víctor',    'Méndez Suárez',     'cedula',            '79678902',   'Av. Circunvalar # 28-40, Bogotá',  '3115678903', '',                              '',                 '3016789014', 'Comerciante',  'Importaciones VM',         'Ventas',           '2025-08-20'],
  ['Gloria',    'Suárez Patiño',     'cedula',            '39789013',   'Cra 6 # 22-15, Montería',          '3216789014', 'gloria.suarez@hotmail.com',     'Eliana Serrano',   '',           'Independiente','Servicios del Hogar GS',    'Honorarios',       '2025-08-25'],
  ['Ernesto',   'Patiño Cruz',       'cedula',            '80890124',   'Calle 30 # 5-20, Riohacha',        '3007890126', 'ernesto.patino@gmail.com',      '',                 '',           'Empleado',     'Cerrejón',                 'Salario',          '2025-09-01'],
  ['Marcela',   'Cruz Álvarez',      'cedula',            '52901235',   'Av. 26 # 59-15, Bogotá',           '3118901237', 'marcela.cruz@gmail.com',        'Gloria Suárez',    '3019012348', 'Empleado',     'ProCredit',                'Salario',          '2025-09-05'],
  ['Jaime',     'Álvarez Mora',      'cedula',            '79012346',   'Cra 68 # 80-30, Bogotá',           '3219012349', 'jaime.alvarez@yahoo.com',       '',                 '',           'Comerciante',  'Repuestos Álvarez',        'Ventas',           '2025-09-10'],
  ['Adriana',   'Mora Ocampo',       'cedula',            '46123458',   'Calle 53 # 46-25, Medellín',       '3000123459', 'adriana.mora@gmail.com',        'Marcela Cruz',     '',           'Independiente','Eventos y Catering AM',     'Honorarios',       '2025-09-15'],
]

export const MOCK_CLIENTES: Cliente[] = RAW.map((r, i) => ({
  id: String(i + 1),
  nombre:              r[0],
  apellidos:           r[1],
  tipoIdentificacion:  r[2],
  numeroIdentificacion:r[3],
  direccion:           r[4],
  telefono:            r[5],
  correo:              r[6] || undefined,
  recomendadoPor:      r[7] || undefined,
  telefonoAdicional:   r[8] || undefined,
  tipoTrabajo:         r[9],
  entidadTrabajo:      r[10],
  fuenteIngresos:      r[11] || undefined,
  createdAt:           r[12],
}))
