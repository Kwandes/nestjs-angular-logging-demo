import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bottles')
export class Bottle {
  @PrimaryGeneratedColumn('uuid')
  bottleId!: string;

  @Column()
  brand!: string;

  @Column()
  capacity!: string;

  @CreateDateColumn({ default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
