package com.modong.boardservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QErrand is a Querydsl query type for Errand
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QErrand extends EntityPathBase<Errand> {

    private static final long serialVersionUID = -672327207L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QErrand errand = new QErrand("errand");

    public final QBoard _super = new QBoard(this);

    public final QBoard board;

    public final StringPath category = createString("category");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> dateCreated = _super.dateCreated;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> dateLastUpdated = _super.dateLastUpdated;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final StringPath description = _super.description;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final NumberPath<Long> userId = _super.userId;

    public QErrand(String variable) {
        this(Errand.class, forVariable(variable), INITS);
    }

    public QErrand(Path<? extends Errand> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QErrand(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QErrand(PathMetadata metadata, PathInits inits) {
        this(Errand.class, metadata, inits);
    }

    public QErrand(Class<? extends Errand> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board")) : null;
    }

}

