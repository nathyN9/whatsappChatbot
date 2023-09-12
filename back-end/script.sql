-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`tb_type_id`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tb_type_id` (
  `id` INT NOT NULL,
  `type_name` VARCHAR(45) NULL,
  `type_alis` VARCHAR(10) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tb_rol` (
  `id` INT NOT NULL,
  `rol_name` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tb_users` (
  `id` INT NOT NULL,
  `user_name` VARCHAR(60) NULL,
  `rol` INT NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(15) NULL,
  `active` TINYINT NULL,
  `id_type` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_type_idx` (`id_type` ASC) VISIBLE,
  INDEX `fk_user_rol_idx` (`rol` ASC) VISIBLE,
  CONSTRAINT `fk_id_type`
    FOREIGN KEY (`id_type`)
    REFERENCES `mydb`.`tb_type_id` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_rol`
    FOREIGN KEY (`rol`)
    REFERENCES `mydb`.`tb_rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tb_sessions` (
  `id` INT NOT NULL,
  `start` TIMESTAMP NULL,
  `end` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_master_questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tb_master_questions` (
  `id` INT NOT NULL,
  `pregunta` VARCHAR(250) NULL,
  `padre` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_interactions_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tb_interactions_log` (
  `id_usuario` INT NOT NULL,
  `id_pregunta` INT NOT NULL,
  `id_sesion` INT NOT NULL,
  `interaction_time` TIMESTAMP NULL,
  PRIMARY KEY (`id_usuario`, `id_pregunta`, `id_sesion`),
  INDEX `fk_question_interaction_idx` (`id_pregunta` ASC) VISIBLE,
  INDEX `fk_session_interaction_idx` (`id_sesion` ASC) VISIBLE,
  CONSTRAINT `fk_user_interaction`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `mydb`.`tb_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_question_interaction`
    FOREIGN KEY (`id_pregunta`)
    REFERENCES `mydb`.`tb_master_questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_session_interaction`
    FOREIGN KEY (`id_sesion`)
    REFERENCES `mydb`.`tb_sessions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;