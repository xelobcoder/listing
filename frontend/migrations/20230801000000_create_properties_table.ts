import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('properties', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.decimal('price', 12, 2).notNullable();
    table.string('property_type').notNullable();
    table.integer('bedrooms').notNullable();
    table.integer('bathrooms').notNullable();
    table.integer('square_feet');
    table.integer('lot_size');
    table.integer('year_built');
    table.string('status').defaultTo('PENDING');
    table.string('address').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('postal_code').notNullable();
    table.string('country').notNullable();
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.boolean('has_garage').defaultTo(false);
    table.boolean('has_pool').defaultTo(false);
    table.boolean('has_basement').defaultTo(false);
    table.boolean('has_fireplace').defaultTo(false);
    table.integer('parking_spaces');
    table.string('heating_type').defaultTo('NONE');
    table.string('cooling_type').defaultTo('NONE');
    table.json('image_urls').defaultTo('[]');
    table.string('video_url');
    table.json('floor_plans').defaultTo('[]');
    table.uuid('agent_id').notNullable();
    table.timestamps(true, true);
    
    // Add indexes for common queries
    table.index('property_type');
    table.index('city');
    table.index('status');
    table.index('agent_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('properties');
}