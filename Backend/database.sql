create database stockdatabase;
use stockdatabase;

CREATE TABLE stock_data (
		id INT AUTO_INCREMENT PRIMARY KEY,
		`date` DATE NOT NULL,
		trade_code VARCHAR(50) NOT NULL,
		high VARCHAR(50) NOT NULL,
		low VARCHAR(50) NOT NULL,
		`open` VARCHAR(50) NOT NULL,
		`close` VARCHAR(50) NOT NULL,
		volume VARCHAR(50) NOT NULL
    );

select * from stock_data;
select count(*) from stock_data as count;
SELECT * FROM stock_data WHERE id = 15960;

