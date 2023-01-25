import{IsString,MinLength,MaxLength} from 'class-validator';
export class CreateDependencyDto {


    @IsString()
    @MinLength(6)
    @MaxLength(50)
    name:string;


}
