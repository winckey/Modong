package com.modong.boardservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupPurchase is a Querydsl query type for GroupPurchase
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupPurchase extends EntityPathBase<GroupPurchase> {

    private static final long serialVersionUID = 320822073L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupPurchase groupPurchase = new QGroupPurchase("groupPurchase");

    public final QBoard _super = new QBoard(this);

    public final QBoard board;

    public final DateTimePath<java.time.LocalDateTime> closeTime = createDateTime("closeTime", java.time.LocalDateTime.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> dateCreated = _super.dateCreated;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> dateLastUpdated = _super.dateLastUpdated;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final StringPath description = _super.description;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> maxPeopleNum = createNumber("maxPeopleNum", Integer.class);

    public final NumberPath<Integer> minPeopleNum = createNumber("minPeopleNum", Integer.class);

    public final StringPath pickupLocation = createString("pickupLocation");

    public final StringPath url = createString("url");

    //inherited
    public final NumberPath<Long> userId = _super.userId;

    public QGroupPurchase(String variable) {
        this(GroupPurchase.class, forVariable(variable), INITS);
    }

    public QGroupPurchase(Path<? extends GroupPurchase> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupPurchase(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupPurchase(PathMetadata metadata, PathInits inits) {
        this(GroupPurchase.class, metadata, inits);
    }

    public QGroupPurchase(Class<? extends GroupPurchase> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board")) : null;
    }

}

