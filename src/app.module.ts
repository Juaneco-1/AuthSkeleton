import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DependenciesModule } from './dependencies/dependencies.module';




@Module({
  imports: [AuthModule,ConfigModule.forRoot(),
  
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      database:process.env.DB_NAME,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize:true,
    }),
  
    DependenciesModule,
  
    
  
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
