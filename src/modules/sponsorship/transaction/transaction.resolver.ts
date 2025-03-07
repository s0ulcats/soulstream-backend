import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Authorization } from '@/src/shared/decorations/auth.decorator';
import { TransactionModel } from './models/transaction.model';
import { Authorized } from '@/src/shared/decorations/authorized.decorator';
import type { User } from '@prisma/client';
import { MakePaymentModel } from './models/make-payment.model';

@Resolver('Transaction')
export class TransactionResolver {
  public constructor(private readonly transactionService: TransactionService) {}

  @Authorization()
  @Query(() => [TransactionModel], { name: "findMyTransactions" })
  public async findMyTransactions(@Authorized() user: User) {
    return this.transactionService.findMyTransactions(user)
  }

  @Authorization()
  @Mutation(() => MakePaymentModel, { name: "makePayment" })
  public async makePayment(
    @Authorized() user: User,
    @Args('planId') planId: string
  ) {
    return this.transactionService.makePayment(user, planId)
  }
}
