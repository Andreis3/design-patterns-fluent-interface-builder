import data from './../database/data.json';
import FluentSQLBuilder from './FluentSQL.js';

const result = FluentSQLBuilder.for(data)
// ou inicia com 2020 ou inicia 2019
.where({ registered: /^(2020|2019)/})
// ^ => fala que é no inicio
// $ => fala que é no fim
// | => ou
.where({ category: /^(security|developer|quality assurance)$/})
// parateses literais precisam de scape () => \(\)
// e ai o grupo (o que precisamos procurar fica dentro do outro parente) (numero1 | numero2)
.where({ phone: /\((852|890|810)\)/})
.select(['name', 'company', 'phone', 'category', 'registered'])
.orderBy('category')
.limit(2)
.build();

console.table(result);