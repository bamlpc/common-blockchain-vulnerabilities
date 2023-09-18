# Transaction Validation (Signature)

Transaction signature validation was not correct in Phantasma Chain

### CBV ID: CBV-23-00008
### Blockchain: Phantasma
### Version affected: -
### Component: Consensus Mechanism
### Severity: 9.0
### Vulnerability Type: Tx Validation
### Credits: @lukeciatt
### Last updated: 18 Sep 2023

## Details

Transaction signature validation was not correct in Phantasma Chain

https://github.com/phantasma-io/phantasma-ng/tree/master/Phantasma.Business/src/Blockchain/Chain.cs#L574

The code was commented, thus there was NO validation and transactions with forged addresses will be executed

If this code was uncommented,

//if (!transaction.HasSignatures)
//{
//    throw new ChainException("Cannot execute unsigned transaction");
//}
the signature validation will be still NOT correct:

https://github.com/phantasma-io/phantasma-ng/tree/master/Phantasma.Core/src/Domain/Transaction.cs:

public bool HasSignatures => Signatures != null && Signatures.Length > 0;

## Recomendations

Use mandatory signature verification on every transaction

## References



### Labels: 

## Test



## Aditional comments


