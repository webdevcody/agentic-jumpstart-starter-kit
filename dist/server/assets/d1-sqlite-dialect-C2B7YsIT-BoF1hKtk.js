import { S as SqliteQueryCompiler, e as SqliteAdapter, b as DEFAULT_MIGRATION_TABLE, d as DEFAULT_MIGRATION_LOCK_TABLE } from "./auth-BWkAJVqq.js";
import "node:crypto";
import "zod";
import "node:fs";
import "node:fs/promises";
import "node:os";
import "node:path";
import "drizzle-orm/pg-core";
import "drizzle-orm/node-postgres";
import "pg";
import "drizzle-orm";
var D1SqliteAdapter = class extends SqliteAdapter {
};
var D1SqliteDriver = class {
  #config;
  #connection;
  constructor(config) {
    this.#config = { ...config };
  }
  async init() {
    this.#connection = new D1SqliteConnection(this.#config.database);
    if (this.#config.onCreateConnection) await this.#config.onCreateConnection(this.#connection);
  }
  async acquireConnection() {
    return this.#connection;
  }
  async beginTransaction() {
    throw new Error("D1 does not support interactive transactions. Use the D1 batch() API instead.");
  }
  async commitTransaction() {
    throw new Error("D1 does not support interactive transactions. Use the D1 batch() API instead.");
  }
  async rollbackTransaction() {
    throw new Error("D1 does not support interactive transactions. Use the D1 batch() API instead.");
  }
  async releaseConnection() {
  }
  async destroy() {
  }
};
var D1SqliteConnection = class {
  #db;
  constructor(db) {
    this.#db = db;
  }
  async executeQuery(compiledQuery) {
    const results = await this.#db.prepare(compiledQuery.sql).bind(...compiledQuery.parameters).all();
    const numAffectedRows = results.meta.changes != null ? BigInt(results.meta.changes) : void 0;
    return {
      insertId: results.meta.last_row_id === void 0 || results.meta.last_row_id === null ? void 0 : BigInt(results.meta.last_row_id),
      rows: results?.results || [],
      numAffectedRows
    };
  }
  async *streamQuery() {
    throw new Error("D1 does not support streaming queries.");
  }
};
var D1SqliteIntrospector = class {
  #db;
  #d1;
  constructor(db, d1) {
    this.#db = db;
    this.#d1 = d1;
  }
  async getSchemas() {
    return [];
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = this.#db.selectFrom("sqlite_master").where("type", "in", ["table", "view"]).where("name", "not like", "sqlite_%").where("name", "not like", "_cf_%").select([
      "name",
      "type",
      "sql"
    ]).$castTo();
    if (!options.withInternalKyselyTables) query = query.where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    const tables = await query.execute();
    if (tables.length === 0) return [];
    const statements = tables.map((table) => this.#d1.prepare("SELECT * FROM pragma_table_info(?)").bind(table.name));
    const batchResults = await this.#d1.batch(statements);
    return tables.map((table, index) => {
      const columnInfo = batchResults[index]?.results ?? [];
      let autoIncrementCol = table.sql?.split(/[(),]/)?.find((it) => it.toLowerCase().includes("autoincrement"))?.split(/\s+/)?.filter(Boolean)?.[0]?.replace(/["`]/g, "");
      if (!autoIncrementCol) {
        const pkCols = columnInfo.filter((r) => r.pk > 0);
        const singlePk = pkCols.length === 1 ? pkCols[0] : void 0;
        if (singlePk && singlePk.type.toLowerCase() === "integer") autoIncrementCol = singlePk.name;
      }
      return {
        name: table.name,
        isView: table.type === "view",
        columns: columnInfo.map((col) => ({
          name: col.name,
          dataType: col.type,
          isNullable: !col.notnull,
          isAutoIncrementing: col.name === autoIncrementCol,
          hasDefaultValue: col.dflt_value != null
        }))
      };
    });
  }
  async getMetadata(options) {
    return { tables: await this.getTables(options) };
  }
};
var D1SqliteQueryCompiler = class extends SqliteQueryCompiler {
};
var D1SqliteDialect = class {
  #config;
  constructor(config) {
    this.#config = { ...config };
  }
  createDriver() {
    return new D1SqliteDriver(this.#config);
  }
  createQueryCompiler() {
    return new D1SqliteQueryCompiler();
  }
  createAdapter() {
    return new D1SqliteAdapter();
  }
  createIntrospector(db) {
    return new D1SqliteIntrospector(db, this.#config.database);
  }
};
export {
  D1SqliteDialect
};
