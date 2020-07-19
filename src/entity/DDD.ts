import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Price from './Price';

@Entity()
export default class DDD {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: number;

    @OneToMany(type => Price, price => price.destination)
    public DddDestination!: Price[];

    @OneToMany(type => Price, price => price.source)
    public DddSource!: Price[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
