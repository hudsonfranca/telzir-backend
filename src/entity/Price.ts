import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    PrimaryColumn,
} from 'typeorm';
import DDD from './DDD';

@Entity()
export default class Price {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => DDD, ddd => ddd.DddDestination, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public destination!: DDD;

    @ManyToOne(type => DDD, ddd => ddd.DddSource, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public source!: DDD;

    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
