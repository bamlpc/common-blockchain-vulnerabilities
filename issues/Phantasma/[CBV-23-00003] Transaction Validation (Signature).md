# Transaction Validation (Signature)

Transaction signature validation was not correct in Phantasma Chain

### CBV ID: CBV-23-00003
### Blockchain: Phantasma
### Version affected: -
### Component: Consensus Mechanism
### Severity: 9.0
### Vulnerability Type: -
### Credits: @lukeciatt
### Last updated: 29 Jan 2023

## Details

Transaction signature validation was not correct in Phantasma Chain

[https://github.com/phantasma-io/phantasma-ng/tree/master/Phantasma.Business/src/Blockchain/Chain.cs#L574](https://github.com/phantasma-io/phantasma-ng/tree/master/Phantasma.Business/src/Blockchain/Chain.cs#L574)

The code was commented, thus there was **NO** validation and transactions with forged addresses will be executed

If this code was uncommented,

```C#
//if (!transaction.HasSignatures)
//{
//    throw new ChainException("Cannot execute unsigned transaction");
//}

```

the signature validation will be still **NOT** correct:

[https://github.com/phantasma-io/phantasma-ng/tree/master/Phantasma.Core/src/Domain/Transaction.cs](https://github.com/phantasma-io/phantasma-ng/tree/master/Phantasma.Core/src/Domain/Transaction.cs):

```C#
public bool HasSignatures => Signatures != null && Signatures.Length > 0;
```

## Recomendations

Use mandatory signature verification on every transaction

## References



### Labels: 

## Test



## Aditional comments


