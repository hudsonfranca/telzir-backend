import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import Price from './Price';

@Entity()
export default class Plans {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    minutes: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
