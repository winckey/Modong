package com.modong.boardservice.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QErrand is a Querydsl query type for Errand
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QErrand extends EntityPathBase<Errand> {

    private static final long serialVersionUID = 92007665L;

    public static final QErrand errand = new QErrand("errand");

    public final QBoard _super = new QBoard(this);

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
        super(Errand.class, forVariable(variable));
    }

    public QErrand(Path<? extends Errand> path) {
        super(path.getType(), path.getMetadata());
    }

    public QErrand(PathMetadata metadata) {
        super(Errand.class, metadata);
    }

}

