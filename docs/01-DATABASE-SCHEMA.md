# Database schema (V1)

Conventions: UUID PKs, `timestamptz`, money as `NUMERIC`, soft delete where noted.

## profiles

`id`, `auth_user_id` (unique), `display_name`, `email`, `avatar_url`, `timezone`, `preferred_currency` (default USD), `onboarding_complete`, `created_at`, `updated_at`

## accounts

`id`, `account_name`, `account_type`, `owner_user_id`, `subscription_tier`, `subscription_status`, `stripe_customer_id`, `stripe_subscription_id`, `current_period_end`, `created_at`, `updated_at`

Tiers: `free` | `pro` | `multi` | `business` | `team`

## account_members

`id`, `account_id`, `user_id`, `role` (owner | admin | member), `status`, `joined_at`

## breadboxes

`id`, `account_id`, `business_name`, `legal_name`, `business_type`, `currency`, `timezone`, `default_daily_goal`, `logo_url`, `status`, `created_at`, `updated_at`, `archived_at`

Business types: products, services, digital, creator, ecommerce, consulting, subscription, mixed, other

## breadbox_members

`id`, `breadbox_id`, `user_id`, `role`, `status`, `created_at`

## brands

`id`, `breadbox_id`, `name`, `description`, `logo_url`, `status`, `created_at`, `updated_at`

## products

`id`, `breadbox_id`, `brand_id`, `name`, `product_type`, `sku`, `description`, `base_price`, `estimated_unit_cost`, `inventory_tracked`, `status`, `created_at`, `updated_at`

## offers

`id`, `breadbox_id`, `brand_id`, `name`, `description`, `selling_price`, `status`, `start_date`, `end_date`, `created_at`, `updated_at`

## offer_items

`id`, `offer_id`, `product_id`, `quantity`, `created_at`

## contacts

`id`, `breadbox_id`, `first_name`, `last_name`, `email`, `phone`, `source`, `contact_status`, `notes`, `created_at`, `updated_at`

Statuses: subscriber, lead, prospect, customer, repeat_customer, inactive

## mission_templates

`id`, `code` (unique), `name`, `description`, `mission_type`, `default_target_value`, `default_duration_days`, `system_template`, `minimum_plan`, `active`, `created_at`

System: `10D_10K` — 10 Days 2 $10K, revenue, 10000, 10 days, min free

## missions

`id`, `breadbox_id`, `template_id`, `brand_id`, `name`, `mission_type`, `target_metric`, `target_value`, `start_date`, `target_date`, `status`, `is_primary`, `free_slot_type` (flagship | custom | null), `created_at`, `updated_at`, `archived_at`

## bread_runs

`id`, `mission_id`, `breadbox_id`, `run_number`, `name`, `run_type`, `target_value`, `start_at`, `end_at`, `status`, `completed_at`, `final_value`, `created_at`

Statuses: planned, active, paused, completed, cancelled, archived

## daily_boxes

`id`, `breadbox_id`, `mission_id`, `bread_run_id`, `operating_date`, `bread_goal`, `opened_at`, `closed_at`, `status`, `what_worked`, `what_didnt`, `tomorrow_number_one_move`, `created_at`, `updated_at`

One primary daily box per breadbox per operating date. Statuses: planned, open, closed, amended

## moves

`id`, `breadbox_id`, `daily_box_id`, `mission_id`, `bread_run_id`, `offer_id`, `title`, `description`, `move_type`, `target_type`, `target_value`, `actual_value`, `is_big_three`, `big_three_position`, `priority`, `status`, `started_at`, `completed_at`, `planned_minutes`, `actual_seconds`, `created_at`, `updated_at`

Max 3 active Big 3 per daily box

## move_results

`id`, `move_id`, `result_type`, `result_value`, `text_value`, `notes`, `created_at`

## sales

`id`, `breadbox_id`, `contact_id`, `offer_id`, `mission_id`, `bread_run_id`, `daily_box_id`, `sale_date`, `subtotal`, `discount`, `tax`, `total`, `sale_status`, `payment_status`, `notes`, `created_at`, `updated_at`

## sale_items

`id`, `sale_id`, `product_id`, `offer_id`, `description`, `quantity`, `unit_price`, `unit_cost`, `line_total`, `created_at`

## payments

`id`, `breadbox_id`, `sale_id`, `payment_date`, `amount`, `payment_method`, `processor`, `processor_fee`, `status`, `reference`, `created_at`

## expenses

`id`, `breadbox_id`, `daily_box_id`, `mission_id`, `bread_run_id`, `product_id`, `expense_date`, `category`, `description`, `amount`, `payment_method`, `recurring`, `receipt_url`, `created_at`, `updated_at`

Categories: COGS, Marketing, Labor, Contractors, Fees, Operations, Fulfillment, Software, Other

## power_blocks

`id`, `breadbox_id`, `daily_box_id`, `move_id`, `category`, `started_at`, `ended_at`, `planned_seconds`, `actual_seconds`, `status`, `notes`, `created_at`

## bread_receipts

Snapshot on close; `amended_at` when day amended — do not silently rewrite history

## plan_entitlements

`plan_code`, limits per FREE / PRO / MULTI / BUSINESS / TEAM — enforce server-side
