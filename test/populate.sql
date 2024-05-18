INSERT INTO carts (id, user_id, created_at, updated_at, status) 
VALUES
(gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
(gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count) 
VALUES
('ac45fd7b-51df-4ff4-a801-d29bd0d71e62', gen_random_uuid(), 1),
('ac45fd7b-51df-4ff4-a801-d29bd0d71e62', gen_random_uuid(), 3);