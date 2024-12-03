import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataOption } from './dataOption.entity';
@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column()
  desc: string;

  @Column({
    default: false,
  })
  isSupper: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => DataOption, (dataOption) => dataOption.dictionary, {
    cascade: true,
  })
  dictList: DataOption[];
}
