module.exports = {
  async up(knex) {
    await knex.schema.alterTable('directus_files', (table) => {
      table.text('blurhash');
    });
  },

  async down(knex) {
    await knex.schema.alterTable('directus_files', (table) => {
      table.dropColumn('blurhash');
    });
  },
};

