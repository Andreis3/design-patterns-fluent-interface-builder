import { expect, describe, test } from "@jest/globals";
import FluentSQLBuilder from "../src/FluentSQL";

const data = [
  {
    id: 0,
    name: "andrei",
    category: "developer",
  },
  {
    id: 1,
    name: "mariazinha",
    category: "developer",
  },
  {
    id: 2,
    name: "joaozinho",
    category: "manager",
  }
];

describe("Test.todo suite for FluentSQL Builder", () => {
  test("#for should return a FluentSQLBuilder instance", () => {
    const result = FluentSQLBuilder.for(data);
    const response = new FluentSQLBuilder({ database: data });

    expect(response).toStrictEqual(result);
  });

  test("#build should return a empty object instance", () => {
    const result = FluentSQLBuilder.for(data).build();
    const response = data;
    expect(response).toStrictEqual(result);
  });

  test("#limit given a collection it should limit results", () => {

    const result = FluentSQLBuilder.for(data).limit(1).build();
    const response =[data[0]];
    expect(response).toStrictEqual(result);
  });

  test("#where given a collection it should filter data", () =>{
    const result = FluentSQLBuilder.for(data).where({
      category: /^dev/
    }).build();
    const response =  data.filter(({category}) => category.slice(0, 3) === 'dev');
    expect(response).toStrictEqual(result);
  });

  test("#select given a collection it should order result by field", () => {
    const result = FluentSQLBuilder.for(data)
    .select(['name', 'category'])
    .build();
    const response =  data.map(({name, category}) => ({ name, category }));
    expect(response).toStrictEqual(result);
  });
  
  test("#orderBy given a collection it should order results by field", () => {
    const result = FluentSQLBuilder.for(data)
    .orderBy('name')
    .build();
    const response =  data.sort(function(a, b){
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;
      return 0;
    });
    expect(response).toStrictEqual(result);
  });

  test("pipeline", () => {
    const result = FluentSQLBuilder.for(data)
    .where({ category: 'developer'})
    .where({name: /m/})
    .select(['name', 'category'])
    .orderBy('name')
    .build();

    const response = data.filter(({ id }) => id === 1).map(({ name, category }) => ({ name, category }));
    expect(response).toStrictEqual(result);

  });
});
