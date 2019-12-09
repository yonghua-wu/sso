CREATE SCHEMA `sso` DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE `sso`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `group_id` INT NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NULL,
  `tel` VARCHAR(45) NULL,
  `crt_time` TIMESTAMP(6) NOT NULL,
  `upd_time` TIMESTAMP(6) NOT NULL,
  `last_login_time` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `group_id_UNIQUE` (`group_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `sso`.`user_groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

INSERT INTO `user_groups` (`description`) VALUES ('root');
INSERT INTO `user_groups` (`description`) VALUES ('ordinary');
