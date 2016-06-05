# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160605211708) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "body",       null: false
    t.integer  "store_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["store_id"], name: "index_comments_on_store_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "store_tags", force: :cascade do |t|
    t.integer  "store_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "store_tags", ["store_id"], name: "index_store_tags_on_store_id", using: :btree
  add_index "store_tags", ["user_id"], name: "index_store_tags_on_user_id", using: :btree

  create_table "store_users", force: :cascade do |t|
    t.integer  "store_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "store_users", ["store_id"], name: "index_store_users_on_store_id", using: :btree
  add_index "store_users", ["user_id"], name: "index_store_users_on_user_id", using: :btree

  create_table "stores", force: :cascade do |t|
    t.string   "name",                        null: false
    t.text     "description"
    t.string   "address",                     null: false
    t.integer  "phone"
    t.string   "email"
    t.boolean  "favorite",    default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "tags", force: :cascade do |t|
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                        null: false
    t.string   "password_digest",                 null: false
    t.string   "email"
    t.boolean  "owner",           default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_foreign_key "comments", "stores"
  add_foreign_key "comments", "users"
  add_foreign_key "store_tags", "stores"
  add_foreign_key "store_tags", "users"
  add_foreign_key "store_users", "stores"
  add_foreign_key "store_users", "users"
end
